export declare const config: {
    prettierPath: {
        title: string;
        description: string;
        type: string;
        default: string;
        get: any;
    };
    eslintPath: {
        title: string;
        description: string;
        type: string;
        default: string;
        get: any;
    };
    prettierFileType: {
        title: string;
        description: string;
        type: string;
        default: string;
        get: any;
    };
    eslintFileType: {
        title: string;
        description: string;
        type: string;
        default: string;
        get: any;
    };
    notifications: {
        title: string;
        description: string;
        type: string;
        default: boolean;
        get: any;
    };
    ysuccess: {
        title: string;
        type: string;
        get: any;
        properties: {
            contents: {
                title: string;
                description: string;
                type: string;
                default: boolean;
            };
            type: {
                title: string;
                description: string;
                type: string;
                default: string;
                enum: string[];
            };
        };
    };
    zerror: {
        title: string;
        type: string;
        get: any;
        properties: {
            contents: {
                title: string;
                description: string;
                type: string;
                default: boolean;
            };
            type: {
                title: string;
                description: string;
                type: string;
                default: string;
                enum: string[];
            };
        };
    };
};
export declare function activate(): void;
export declare function serialize(): void;
export declare function run(): void;
export declare function getCurrentFilePath(): any;
export declare function getPathToESLint(cwd: any): any;
export declare function getPathToPrettier(cwd: any): any;
export declare function getValidFilePaths(fileType: any, filepath: any): any[];
export declare function execPrettier(filepath: any): void;
export declare function execEslint(filepath: any): void;
export declare function cliExec(cwd: any, runner: any, arg: any, callback: any): void;
export declare function provideLinter(): {
    name: string;
    grammarScopes: string[];
    scope: string;
    lintsOnChange: boolean;
    lint: (current_editor: any) => Promise<any[]>;
};
