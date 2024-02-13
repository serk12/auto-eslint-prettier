"use strict";

var prefix = "auto-prettier-eslint.";
function getValue(key) {
  return atom.config.get(prefix + key);
}

const Config = {
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
  prettierFileType: {
    title: "File types for Prettier",
    description: "Comma separated list of file types.",
    type: "string",
    default: "js, ts, tsx",
    get: getValue.bind(null, "prettierFileType"),
  },
  eslintFileType: {
    title: "File types for ESLint",
    description: "Comma separated list of file types.",
    type: "string",
    default: "ts, tsx",
    get: getValue.bind(null, "eslintFileType"),
  },
  notifications: {
    title: "Show notification",
    description: "show a blue notification when starting running and when it's completed",
    type: "boolean",
    default: true,
    get: getValue.bind(null, "notifications"),
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

export default Config;
