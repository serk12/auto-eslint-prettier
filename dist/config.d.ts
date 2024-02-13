declare const Config: {
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
export default Config;
