"use strict";

import { execFile } from "child_process";
import Config from "./config.js";
import path from "path";
import fs from "fs";
import { generateRange } from "atom-linter";
import { LintResult, LintMessage } from "./ESlintTypes.d.js";
import ESLint from "eslint";

const cliEngine: ESLint.ESLint = new ESLint.ESLint({});

function bytes2String(bytes) {
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    result += String.fromCharCode(bytes[i]);
  }
  return result;
}

export const config = Config;
let next_ready = false;
let editor = null;
let start_time = Date.now();

function parseErrorsAsync() {
  const results = [];
  let parsing = current_errors;
  const messages: LintMessage[] = [];
  let file_path = "";
  parsing = parsing.substring(0, parsing.lastIndexOf(" problems") + 1);
  let qtty = parseInt(parsing.substring(parsing.lastIndexOf("\n"), parsing.length - 1));
  let aqtty = parsing.substring(parsing.lastIndexOf("\n"), parsing.length - 1);
  while (parsing.length > 0 && qtty > 0) {
    --qtty;
    const fileAndWhere = parsing.substring(0, parsing.indexOf(" "));
    parsing = parsing.substring(parsing.indexOf(" "));

    const message = parsing.substring(0, parsing.indexOf("\n"));
    parsing = parsing.substring(parsing.indexOf("\n") + 1);

    const [fp, line, column, _] = fileAndWhere.split(":");
    file_path = fp;
    messages.push({
      message: message,
      line: Number(line) - 1,
      column: Number(column) - 1,
      ruleId: null,
    } as LintMessage);
  }
  results.push({
    filePath: file_path,
    messages: messages,
    errorCount: messages.length,
    fatalErrorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  } as LintResult);

  return fromLintToLinter(results);
}

function fromLintToLinter(results: LintResult[]): Promise<any[]> {
  const promises = [];
  for (let i = 0; i < results.length; ++i) {
    for (let j = 0; j < results[i].messages.length; ++j) {
      promises.push({
        severity: "error", // results[i].messages[j].severity,
        excerpt: results[i].messages[j].message,
        location: {
          file: results[i].filePath,
          position: generateRange(editor, results[i].messages[j].line, results[i].messages[j].column),
        },
      });
    }
  }
  return Promise.resolve(promises);
}

function waitToReady(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const id = setInterval(() => {
      if (next_ready || Date.now() > start_time + 30000) {
        clearInterval(id);
        resolve(parseErrorsAsync());
      }
    });
  });
}

let current_errors = "";
let current_results: Promise<any[]> | null = null;
const current_config = config;
let running = false;
let child = null;

function logNotification(text, tittle = "-- DEBUG --") {
  const args = { dismissable: tittle === "-- DEBUG --", detail: text };
  atom.notifications.addInfo(tittle, args);
}

export function activate() {
  atom.commands.add("atom-workspace", {
    "auto-prettier-eslint:run": () => {
      run();
    },
  });

  atom.workspace.observeTextEditors((editor) => {
    editor.onDidSave(() => {
      atom.notifications.clear();
      const files = getValidFilePaths(current_config.prettierFileType.get(), getCurrentFilePath());
      if (files.length === 0) return;
      if (running && child) {
        child.kill();
        running = false;
      }
      if (!running) {
        if (current_config.notifications.get()) {
          logNotification("", "Running auto-prettier-eslint");
        }
        running = true;
        run();
      }
    });
  });
}

export function serialize() {}

export function run() {
  execPrettier(getCurrentFilePath());
}

function getCurrentWorkingDir(filepath) {
  let cwd;
  atom.project.getDirectories().forEach(function (dir) {
    const dirpath = dir.getPath();
    const relpath = path.relative(dirpath, filepath);
    const dirIsParent = !/^\.\.\//.test(relpath);
    if (dirIsParent) {
      cwd = dirpath;
    }
  });
  cwd = cwd || process.cwd();
  return cwd;
}

export function getCurrentFilePath() {
  // @ts-expect-error
  return atom.workspace.getActivePaneItem().getPath();
}

export function getPathToESLint(cwd) {
  if (current_config.eslintPath.get()) {
    return current_config.eslintPath.get();
  }
  if (fs.existsSync(`${cwd}/node_modules/.bin/eslint`)) {
    return "./node_modules/.bin/eslint";
  }
  return "eslint";
}

export function getPathToPrettier(cwd) {
  if (current_config.prettierPath.get()) {
    return current_config.prettierPath.get();
  }
  if (fs.existsSync(`${cwd}/node_modules/.bin/prettier`)) {
    return "./node_modules/.bin/prettier";
  }
  return "prettier";
}

export function getValidFilePaths(fileType, filepath) {
  const files = [];
  const paths = filepath instanceof Array ? filepath.slice() : [filepath];
  const rex = new RegExp("\\.(" + fileType.replace(/\s*,\s*/g, "|") + ")$");
  for (let i = 0; i < paths.length; ++i) {
    if (rex.test(paths[i])) {
      files.push(paths[i]);
    }
  }
  return files;
}

export function execPrettier(filepath) {
  const args = getValidFilePaths(current_config.prettierFileType.get(), filepath);
  if (args.length === 0) {
    running = false;
    return;
  }
  args.unshift("-w");
  args.unshift("--cache");
  const cwd = getCurrentWorkingDir(filepath);
  const runner = getPathToPrettier(cwd);
  cliExec(cwd, runner, args, () => {
    execEslint(filepath);
  });
}

export function execEslint(filepath) {
  const args = getValidFilePaths(current_config.eslintFileType.get(), filepath);
  if (args.length === 0) {
    running = false;
    return;
  }
  args.unshift("--fix");
  args.unshift("--cache");
  args.unshift("--no-ignore");
  args.unshift("--format=unix");

  const cwd = getCurrentWorkingDir(filepath);
  const runner = getPathToESLint(cwd);
  cliExec(cwd, runner, args, () => {});
}

export function cliExec(cwd, runner, arg, callback) {
  if (runner.includes("eslint")) {
    // const file = arg[arg.length - 1];
    // const parseErrorsAsync = (result: any[]) => {
    //     const result2 = cliEngine.lintFiles(file) as any as LintResult[];
    //     return result.concat(result2);
    //   };
    //
    // if (current_results != null) {
    //   current_results.then(parseErrorsAsync);
    // }
  }

  child = execFile(runner, arg, { cwd, shell: false }, (error, stdout, stderr) => {
    const out = stdout;
    const err = stderr;
    const args = { detail: err ? err + "\n" + out : out, dismissable: false };
    const notif = error ? current_config.zerror.get() : current_config.ysuccess.get();
    if (current_config.notifications.get()) {
      logNotification("", runner + " compleated");
    }
    if (runner.includes("eslint")) {
      current_errors = out;
      if (current_results != null) {
        current_results.then(parseErrorsAsync);
      }
      next_ready = true;
    }
    running = false;
    child = null;
    callback();
    // notifications handle
    if (notif.type === "none") {
      return;
    } else if (notif.type === "dismissable" && err.length + out.length > 0) {
      args.dismissable = true;
    }
    if (error) {
      atom.notifications.addError(runner + " failed", args);
    } else {
      atom.notifications.addSuccess(runner + " successful", args);
    }
  });
}
//
// export function provideLinter() {
//   return {
//     name: "Eslint",
//     grammarScopes: ["source.ts"],
//     scope: "file",
//     lintsOnChange: false,
//     lint: (editor) => {
//       let promises = [];
//       let parsing = current_errors;
//       while (parsing.length > 0 && parsing.indexOf("\n") !== 0) {
//         const fileAndWhere = parsing.substring(0, parsing.indexOf(" "));
//         parsing = parsing.substring(parsing.indexOf(" "));
//
//         const message = parsing.substring(0, parsing.indexOf("\n"));
//         parsing = parsing.substring(parsing.indexOf("\n"));
//
//         const [path, line, column, dummy] = fileAndWhere.split(":");
//
//         promises.push({
//           severity: "error",
//           excerpt: message,
//           location: {
//             file: path,
//             position: generateRange(editor, Number(line) - 1, Number(column) - 1),
//           },
//         });
//       }
//       return Promise.resolve(promises);
//     },
//   };
// }

export function provideLinter() {
  return {
    name: "Eslint",
    grammarScopes: ["source.ts"],
    scope: "file",
    lintsOnChange: false,
    lint: (current_editor): Promise<any[]> => {
      editor = current_editor;
      next_ready = false;
      start_time = Date.now();
      current_results = waitToReady();
      return current_results;
    },
  };
}
