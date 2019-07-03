import { EventEmitter } from "../../../dist/types/stencil.core";
export declare class NovaTreeNode {
    el: any;
    text: string;
    checkable?: boolean;
    selectable?: boolean;
    blockNode?: boolean;
    nodeKey: string;
    selected: boolean;
    autoExpandParent: boolean;
    defaultExpandAll: boolean;
    disableCheckbox: boolean;
    checkStrictly: boolean;
    multiple: boolean;
    disabled: boolean;
    checked: boolean;
    expanded: boolean;
    subnodes: NovaTreeNode[];
    private isLeaf;
    checkNode: EventEmitter;
    selectNode: EventEmitter;
    checkChangedFromChild: boolean;
    refToSubnodes: HTMLNovaTreeNodeElement[];
    checkedChange(newValue: boolean, _oldValue: boolean): void;
    componentWillLoad(): void;
    updateIsLeaf(newValue: NovaTreeNode[], oldValue: NovaTreeNode[]): void;
    onExpand(newValue: boolean, _oldValue: boolean): void;
    getCheckedKeys(): Promise<string[]>;
    render(): HTMLElement;
    /**
     * Local methods
     */
    private _generateCaret;
    private _toggleExpandedState;
    private _generateCheckbox;
    private _updateCheckedState;
    private _generateTextbox;
    private _toggleSelectedState;
    private _generateListOfSubnodes;
    private _generateSubnode;
    private _handleSubnodeOnCheck;
}
