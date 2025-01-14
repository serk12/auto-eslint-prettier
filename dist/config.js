"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prefix = "auto-eslint-prettier.";
function getValue(key) {
    return atom.config.get(prefix + key);
}
const Config = {
    prettierPath: {
        title: "Prettier Path",
        description: "Path to Prettier. If empty, then will use Prettier in node_modules, or global.",
        type: "string",
        default: "",
        get: getValue.bind(null, "prettierPath"),
    },
    eslintPath: {
        title: "ESLint Path",
        description: "Path to eslint. If empty, then will use eslint in node_modules, or global.",
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
                description: "If enabled, will show full output of the command in the notification. Otherwise will only show status message.",
                type: "boolean",
                default: false,
            },
            type: {
                title: "Notification type",
                description: "Dismissable will leave the notification on screen until you manually close it. Timed will show up temporarily. None will show no notification.",
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
                description: "If enabled, will show full output of the command in the notification. Otherwise will only show status message.",
                type: "boolean",
                default: true,
            },
            type: {
                title: "Notification type",
                description: "Dismissable will leave the notification on screen until you manually close it. Timed will show up temporarily. None will show no notification.",
                type: "string",
                default: "dismissable",
                enum: ["dismissable", "timed", "none"],
            },
        },
    },
};
exports.default = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxNQUFNLEdBQUcsdUJBQXVCLENBQUM7QUFDckMsU0FBUyxRQUFRLENBQUMsR0FBRztJQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTSxNQUFNLEdBQUc7SUFDYixZQUFZLEVBQUU7UUFDWixLQUFLLEVBQUUsZUFBZTtRQUN0QixXQUFXLEVBQ1QsZ0ZBQWdGO1FBQ2xGLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEVBQUU7UUFDWCxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDO0tBQ3pDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsS0FBSyxFQUFFLGFBQWE7UUFDcEIsV0FBVyxFQUNULDRFQUE0RTtRQUM5RSxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxFQUFFO1FBQ1gsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztLQUN2QztJQUNELGdCQUFnQixFQUFFO1FBQ2hCLEtBQUssRUFBRSx5QkFBeUI7UUFDaEMsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQztLQUM3QztJQUNELGNBQWMsRUFBRTtRQUNkLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQztLQUMzQztJQUNELGFBQWEsRUFBRTtRQUNiLEtBQUssRUFBRSxtQkFBbUI7UUFDMUIsV0FBVyxFQUFFLHdFQUF3RTtRQUNyRixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQztLQUMxQztJQUNELFFBQVEsRUFBRTtRQUNSLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsSUFBSSxFQUFFLFFBQVE7UUFDZCxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO1FBQ3BDLFVBQVUsRUFBRTtZQUNWLFFBQVEsRUFBRTtnQkFDUixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsV0FBVyxFQUNULGdIQUFnSDtnQkFDbEgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDZjtZQUNELElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixXQUFXLEVBQ1QsZ0pBQWdKO2dCQUNsSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7YUFDdkM7U0FDRjtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixJQUFJLEVBQUUsUUFBUTtRQUNkLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7UUFDbEMsVUFBVSxFQUFFO1lBQ1YsUUFBUSxFQUFFO2dCQUNSLEtBQUssRUFBRSxhQUFhO2dCQUNwQixXQUFXLEVBQ1QsZ0hBQWdIO2dCQUNsSCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLFdBQVcsRUFDVCxnSkFBZ0o7Z0JBQ2xKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxhQUFhO2dCQUN0QixJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQzthQUN2QztTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBwcmVmaXggPSBcImF1dG8tZXNsaW50LXByZXR0aWVyLlwiO1xuZnVuY3Rpb24gZ2V0VmFsdWUoa2V5KSB7XG4gIHJldHVybiBhdG9tLmNvbmZpZy5nZXQocHJlZml4ICsga2V5KTtcbn1cblxuY29uc3QgQ29uZmlnID0ge1xuICBwcmV0dGllclBhdGg6IHtcbiAgICB0aXRsZTogXCJQcmV0dGllciBQYXRoXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlBhdGggdG8gUHJldHRpZXIuIElmIGVtcHR5LCB0aGVuIHdpbGwgdXNlIFByZXR0aWVyIGluIG5vZGVfbW9kdWxlcywgb3IgZ2xvYmFsLlwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZGVmYXVsdDogXCJcIixcbiAgICBnZXQ6IGdldFZhbHVlLmJpbmQobnVsbCwgXCJwcmV0dGllclBhdGhcIiksXG4gIH0sXG4gIGVzbGludFBhdGg6IHtcbiAgICB0aXRsZTogXCJFU0xpbnQgUGF0aFwiLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgXCJQYXRoIHRvIGVzbGludC4gSWYgZW1wdHksIHRoZW4gd2lsbCB1c2UgZXNsaW50IGluIG5vZGVfbW9kdWxlcywgb3IgZ2xvYmFsLlwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZGVmYXVsdDogXCJcIixcbiAgICBnZXQ6IGdldFZhbHVlLmJpbmQobnVsbCwgXCJlc2xpbnRQYXRoXCIpLFxuICB9LFxuICBwcmV0dGllckZpbGVUeXBlOiB7XG4gICAgdGl0bGU6IFwiRmlsZSB0eXBlcyBmb3IgUHJldHRpZXJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBmaWxlIHR5cGVzLlwiLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZGVmYXVsdDogXCJqcywgdHMsIHRzeFwiLFxuICAgIGdldDogZ2V0VmFsdWUuYmluZChudWxsLCBcInByZXR0aWVyRmlsZVR5cGVcIiksXG4gIH0sXG4gIGVzbGludEZpbGVUeXBlOiB7XG4gICAgdGl0bGU6IFwiRmlsZSB0eXBlcyBmb3IgRVNMaW50XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgZmlsZSB0eXBlcy5cIixcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIGRlZmF1bHQ6IFwidHMsIHRzeFwiLFxuICAgIGdldDogZ2V0VmFsdWUuYmluZChudWxsLCBcImVzbGludEZpbGVUeXBlXCIpLFxuICB9LFxuICBub3RpZmljYXRpb25zOiB7XG4gICAgdGl0bGU6IFwiU2hvdyBub3RpZmljYXRpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJzaG93IGEgYmx1ZSBub3RpZmljYXRpb24gd2hlbiBzdGFydGluZyBydW5uaW5nIGFuZCB3aGVuIGl0J3MgY29tcGxldGVkXCIsXG4gICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBnZXQ6IGdldFZhbHVlLmJpbmQobnVsbCwgXCJub3RpZmljYXRpb25zXCIpLFxuICB9LFxuICB5c3VjY2Vzczoge1xuICAgIHRpdGxlOiBcIlN1Y2Nlc3MgTm90aWZpY2F0aW9uc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgZ2V0OiBnZXRWYWx1ZS5iaW5kKG51bGwsIFwieXN1Y2Nlc3NcIiksXG4gICAgcHJvcGVydGllczoge1xuICAgICAgY29udGVudHM6IHtcbiAgICAgICAgdGl0bGU6IFwiU2hvdyBvdXRwdXRcIixcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgXCJJZiBlbmFibGVkLCB3aWxsIHNob3cgZnVsbCBvdXRwdXQgb2YgdGhlIGNvbW1hbmQgaW4gdGhlIG5vdGlmaWNhdGlvbi4gT3RoZXJ3aXNlIHdpbGwgb25seSBzaG93IHN0YXR1cyBtZXNzYWdlLlwiLFxuICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdHlwZToge1xuICAgICAgICB0aXRsZTogXCJOb3RpZmljYXRpb24gdHlwZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkRpc21pc3NhYmxlIHdpbGwgbGVhdmUgdGhlIG5vdGlmaWNhdGlvbiBvbiBzY3JlZW4gdW50aWwgeW91IG1hbnVhbGx5IGNsb3NlIGl0LiBUaW1lZCB3aWxsIHNob3cgdXAgdGVtcG9yYXJpbHkuIE5vbmUgd2lsbCBzaG93IG5vIG5vdGlmaWNhdGlvbi5cIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgZGVmYXVsdDogXCJ0aW1lZFwiLFxuICAgICAgICBlbnVtOiBbXCJkaXNtaXNzYWJsZVwiLCBcInRpbWVkXCIsIFwibm9uZVwiXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgemVycm9yOiB7XG4gICAgdGl0bGU6IFwiRXJyb3IgTm90aWZpY2F0aW9uc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgZ2V0OiBnZXRWYWx1ZS5iaW5kKG51bGwsIFwiemVycm9yXCIpLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGNvbnRlbnRzOiB7XG4gICAgICAgIHRpdGxlOiBcIlNob3cgb3V0cHV0XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiSWYgZW5hYmxlZCwgd2lsbCBzaG93IGZ1bGwgb3V0cHV0IG9mIHRoZSBjb21tYW5kIGluIHRoZSBub3RpZmljYXRpb24uIE90aGVyd2lzZSB3aWxsIG9ubHkgc2hvdyBzdGF0dXMgbWVzc2FnZS5cIixcbiAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgdHlwZToge1xuICAgICAgICB0aXRsZTogXCJOb3RpZmljYXRpb24gdHlwZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkRpc21pc3NhYmxlIHdpbGwgbGVhdmUgdGhlIG5vdGlmaWNhdGlvbiBvbiBzY3JlZW4gdW50aWwgeW91IG1hbnVhbGx5IGNsb3NlIGl0LiBUaW1lZCB3aWxsIHNob3cgdXAgdGVtcG9yYXJpbHkuIE5vbmUgd2lsbCBzaG93IG5vIG5vdGlmaWNhdGlvbi5cIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgZGVmYXVsdDogXCJkaXNtaXNzYWJsZVwiLFxuICAgICAgICBlbnVtOiBbXCJkaXNtaXNzYWJsZVwiLCBcInRpbWVkXCIsIFwibm9uZVwiXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcbiJdfQ==