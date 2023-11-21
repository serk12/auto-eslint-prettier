"use strict";

var prefix = "eslint-fixer.";
function getValue(key) {
  return atom.config.get(prefix + key);
}
module.exports = {
  // save: {
  //     title: 'Fix on save',
  //     description: 'If checked, will run eslint --fix after saving files.',
  //     type: 'boolean',
  //     default: false,
  //     get: getValue.bind(null, 'save')
  // },
  // open: {
  //     title: 'Fix on open',
  //     description: 'If checked, will run eslint --fix after saving files.',
  //     type: 'boolean',
  //     default: false,
  //     get: getValue.bind(null, 'open')
  // },
  prettierPath: {
    title: "Prettier Path",
    description:
      "Path to Prettier. If empty, then will use Prettier in node_modules, or global.",
    type: "string",
    default: "",
    get: getValue.bind(null, "prettierPath"),
  },
  eslintPath: {
    title: "ESLint Path",
    description:
      "Path to eslint. If empty, then will use eslint in node_modules, or global.",
    type: "string",
    default: "",
    get: getValue.bind(null, "eslintPath"),
  },
  fileType: {
    title: "File types",
    description: "Comma separated list of file types.",
    type: "string",
    default: "js, ts, tsx",
    get: getValue.bind(null, "fileType"),
  },
  ysuccess: {
    title: "Success Notifications",
    type: "object",
    get: getValue.bind(null, "ysuccess"),
    properties: {
      contents: {
        title: "Show output",
        description:
          "If enabled, will show full output of the command in the notification. Otherwise will only show status message.",
        type: "boolean",
        default: false,
      },
      type: {
        title: "Notification type",
        description:
          "Dismissable will leave the notification on screen until you manually close it. Timed will show up temporarily. None will show no notification.",
        type: "string",
        default: "timed",
        enum: ["dismissable", "timed", "none"],
      },
    },
  },
  zerror: {
    title: "Error Notifications",
    type: "object",
    get: getValue.bind(null, "zerror"),
    properties: {
      contents: {
        title: "Show output",
        description:
          "If enabled, will show full output of the command in the notification. Otherwise will only show status message.",
        type: "boolean",
        default: true,
      },
      type: {
        title: "Notification type",
        description:
          "Dismissable will leave the notification on screen until you manually close it. Timed will show up temporarily. None will show no notification.",
        type: "string",
        default: "dismissable",
        enum: ["dismissable", "timed", "none"],
      },
    },
  },
};
