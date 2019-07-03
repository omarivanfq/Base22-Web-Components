declare const DEFAULT_LABELS: {
    titleSource: string;
    titleTarget: string;
    operationLeft: string;
    operationRight: string;
    unit: string;
    units: string;
    notFoundContent: string;
    searchPlaceholder: string;
};
declare const DEFAULT_FUNCTIONS: {
    filterOption: (value: any, option: any) => boolean;
    renderItem: (item: any) => any;
};
declare const DEFAULT_CONFIGURATION: {
    labels: {
        titleSource: string;
        titleTarget: string;
        operationLeft: string;
        operationRight: string;
        unit: string;
        units: string;
        notFoundContent: string;
        searchPlaceholder: string;
    };
    functions: {
        filterOption: (value: any, option: any) => boolean;
        renderItem: (item: any) => any;
    };
};
export { DEFAULT_CONFIGURATION, DEFAULT_LABELS, DEFAULT_FUNCTIONS };
