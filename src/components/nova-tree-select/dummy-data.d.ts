declare const TREE_ITEMS: {
    nodeKey: string;
    text: string;
    disableCheckbox: boolean;
    disabled: boolean;
    selected: boolean;
    checked: boolean;
    expanded: boolean;
    subnodes: {
        nodeKey: string;
        text: string;
        disableCheckbox: boolean;
        disabled: boolean;
        selected: boolean;
        checked: boolean;
        expanded: boolean;
        subnodes: {
            nodeKey: string;
            text: string;
            disableCheckbox: boolean;
            disabled: boolean;
            selected: boolean;
            checked: boolean;
            expanded: boolean;
            subnodes: {
                nodeKey: string;
                text: string;
                disableCheckbox: boolean;
                disabled: boolean;
                selected: boolean;
                checked: boolean;
                expanded: boolean;
                subnodes: any[];
            }[];
        }[];
    }[];
}[];
export { TREE_ITEMS };
