"use strict";

var $atom = require("atom");
var execFile = require("child_process").execFile;
var config = require("./config.js");
var path = require("path");
var fs = require("fs");

function bytes2String(bytes) {
  var result = "";
  for (var i = 0; i < bytes.length; i++) {
    result += String.fromCharCode(bytes[i]);
  }
  return result;
}
var PulsarEslintFix = {
  config: config,
  running: false,
  child: null,
  logNotification: function (text, tittle = "-- DEBUG --") {
    let args = {};
    args.dismissable = false;
    args.detail = text;
    atom.notifications.addInfo(tittle, args);
  },
  activate: function () {
    atom.commands.add("atom-workspace", {
      "atom-eslint-fix:run": () => this.run(),
    });
    atom.commands.add(".tree-view .file .name", {
      "atom-eslint-fix:run-tree-view": () => this.runTreeView(),
    });
    atom.workspace.observeTextEditors((editor) => {
      editor.onDidSave(() => {
        var files = this.getValidFilePaths(this.getCurrentFilePath());
        if (files.length === 0) return;
        if (this.running && this.child) {
          this.child.kill();
          this.running = false;
        }
        if (!this.running) {
          this.logNotification("", "Running ESLint --fix");
          this.running = true;
          this.run();
        }
      });
    });
  },
  serialize: function () {},
  run: function () {
    this.execPrettier(this.getCurrentFilePath());
  },
  getCurrentWorkingDir: function (filepath) {
    var cwd;
    atom.project.getDirectories().forEach(function (dir) {
      var dirpath = dir.getPath();
      var relpath = path.relative(dirpath, filepath);
      var dirIsParent = !/^\.\.\//.test(relpath);
      if (dirIsParent) {
        cwd = dirpath;
      }
    });
    cwd = cwd || process.cwd();
    return cwd;
  },
  getCurrentFilePath: function () {
    return atom.workspace.getActivePaneItem().getPath();
  },
  getTreeSelectedFiles: function () {
    let args = {};
    var treeView = atom.packages.getLoadedPackage("tree-view");
    if (!treeView) {
      return [];
    }
    treeView = require(treeView.mainModulePath).treeView;
    return treeView.selectedPaths();
  },
  getPathToESLint: function (cwd) {
    if (this.config.eslintPath.get()) {
      return this.config.eslintPath.get();
    }
    if (fs.existsSync(`${cwd}/node_modules/.bin/eslint`)) {
      return `./node_modules/.bin/eslint`;
    }
    return "eslint";
  },
  getPathToPrettier: function (cwd) {
    if (this.config.prettierPath.get()) {
      return this.config.prettierPath.get();
    }
    if (fs.existsSync(`${cwd}/node_modules/.bin/prettier`)) {

        return `./node_modules/.bin/prettier`;
    }
    return "prettier";
  },
  getValidFilePaths: function (filepath) {
    var files = [];
    var paths = filepath instanceof Array ? filepath.slice() : [filepath];
    var rex = new RegExp(
      "\\.(" + this.config.fileType.get().replace(/\s*,\s*/g, "|") + ")$"
    );
    for (let i = 0; i < paths.length; ++i) {
      if (rex.test(paths[i])) {
        files.push(paths[i]);
      }
    }
    return files;
  },
  runTreeView: function (data) {
    var files = this.getTreeSelectedFiles();
    if (!files) {
      return;
    }
    for (let i = 0, l = files.length; i < l; i++) {
      this.execPrettier(files[i]);
    }
  },
  execPrettier: function (filepath) {
    let args = this.getValidFilePaths(filepath);
    if (args.length === 0) {
      this.running = false;
      return;
    }
    args.unshift("-w");
    args.unshift("--cache");
      var cwd = this.getCurrentWorkingDir(filepath);
    var runner = this.getPathToPrettier(cwd);
    this.cliExec(cwd, runner, args, () => {this.execEslint(filepath);});
  },
  execEslint: function (filepath) {
    let args = this.getValidFilePaths(filepath);
    if (args.length === 0) {
      this.running = false;
      return;
    }
    args.unshift("--fix");
    args.unshift("--cache");

      var cwd = this.getCurrentWorkingDir(filepath);
    var runner = this.getPathToESLint(cwd);
    this.cliExec(cwd, runner, args, () => {});
  },
  cliExec: function (cwd, runner, args, callback) {
    this.logNotification(cwd);
    this.logNotification(runner);
    this.logNotification(args);
    this.child = execFile(
      runner,
      args,
      { cwd: cwd, shell: false },
      (error, stdout, stderr) => {
        let out = stdout;
        let err = stderr;
        let args = {};
        let notif = err ? this.config.zerror.get() : this.config.ysuccess.get();
        if (notif.type === "none") {
          return;
        } else if (
          notif.type === "dismissable" &&
          err.length + out.length > 0
        ) {
          args.dismissable = true;
        }

        if (notif.contents) {
          args.detail = err ? err + "\n" + out : out;
        }
        if (err) {
          atom.notifications.addError("ESLint --fix failed", args);
        } else {
          atom.notifications.addSuccess("ESLint --fix successful", args);
        }
        this.running = false;
        this.child = null;
        callback();
      }
    );
  },
};

module.exports = PulsarEslintFix;
