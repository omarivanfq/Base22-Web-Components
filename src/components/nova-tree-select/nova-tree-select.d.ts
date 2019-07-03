import { EventEmitter } from "../../../dist/types/stencil.core";
export declare class NovaTreeSelect {
    el: any;
    selectedKeys: string[];
    multiple: boolean;
    blockNode: boolean;
    checkable: boolean;
    toBeRemoved: string[];
    disabled: boolean;
    styles: {};
    dropdownStyle: {};
    placeholder: string;
    data?: {
        items: {
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
    };
    maxTagCount: number;
    maxTagCountToBeRemove: string[];
    private flatItems;
    open: boolean;
    private tree;
    onChange: EventEmitter;
    onSelect: EventEmitter;
    private allSelectedKeys;
    dataChange(_newValue: any, _oldValue: any): void;
    private _getFlatItems;
    private _toFlatItemsRec;
    componentWillLoad(): void;
    private _removeAllOptions;
    private _removeMultipleOptions;
    private _updateAllItems;
    private _updateAllItemsRec;
    private _updateItem;
    private _updateItemRec;
    private _getOptionsSelected;
    private _removeOption;
    private _addOption;
    private _handleSelection;
    render(): HTMLNovaTreeSelectElement;
}
