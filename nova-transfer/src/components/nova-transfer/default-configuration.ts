const DEFAULT_LABELS = {
    titleSource: "source",
    titleTarget: "target",
    operationLeft: "",
    operationRight: "",
    unit: "item",
    units: "items",
    notFoundContent: "the list is empty",
    searchPlaceholder: "search here"
};
  
const DEFAULT_FUNCTIONS = {
    filterOption: (value, option) => option.title.indexOf(value) !== -1,
    renderItem: (item) => item.title
}

const DEFAULT_CONFIGURATION = {
    labels: DEFAULT_LABELS,
    functions: DEFAULT_FUNCTIONS
};

export { DEFAULT_CONFIGURATION, DEFAULT_LABELS, DEFAULT_FUNCTIONS };
  