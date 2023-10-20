"use strict";

var $atom = require("atom");
var c = console;
var cp = require("child_process");
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
  logNotification: function (text, tittle = "-- DEBUG --") {
    let args = {};
    args.dismissable = true;
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
    this.exec(this.getCurrentFilePath());
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
      return "./node_modules/.bin/eslint";
    }
    return "eslint";
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
      this.exec(files[i]);
    }
  },
  exec: function (filepath) {
    let p;
    let out = "";
    let err = "";
    let args = this.getValidFilePaths(filepath);
    if (args.length === 0) {
      this.running = false;
      return;
    }
    args.unshift("--fix");
    var cwd = this.getCurrentWorkingDir(filepath);
    var runner = this.getPathToESLint(cwd);
    p = cp.spawn(runner, args, { cwd: cwd });
    p.stdout.on("data", (data) => {
      out += bytes2String(data);
    });
    p.stderr.on("data", (data) => {
      err += bytes2String(data);
    });
    p.on("close", (code) => {
      let args = {};
      let notif = err ? this.config.zerror.get() : this.config.ysuccess.get();
      if (notif.type === "none") {
        return;
      } else if (notif.type === "dismissable") {
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
    });
    p.on("exit", (code, signal) => {
      this.running = false;
    });
    p.on("error", (err) => {
      this.running = false;
    });
  },
};

module.exports = PulsarEslintFix;
