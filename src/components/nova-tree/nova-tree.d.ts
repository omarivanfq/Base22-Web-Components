import { EventEmitter } from "../../../dist/types/stencil.core";
export declare class NovaTree {
    el: any;
    /**
     *  Common attributes
     */
    data?: {
        items: any[];
    };
    /**
     *  Common attributes
     */
    configuration?: object;
    /**
     *  Common attributes
     */
    styling?: object;
    autoExpandParent: boolean;
    defaultExpandAll: boolean;
    disableTree: boolean;
    blockNode: boolean;
    multiple: boolean;
    checkable: boolean;
    selectable: boolean;
    checkStrictly: boolean;
    selected: any;
    nodeKey: string;
    disabled: boolean;
    styles: object;
    selectedKeys: string[];
    select: EventEmitter;
    check: EventEmitter;
    private refToTopLevelNodes;
    dataChange(_newValue: any, _oldValue: any): void;
    updateData(data: any): Promise<void>;
    private _updateCheckboxes;
    getCheckedKeys(): Promise<string[]>;
    getAllCheckedKeys(): Promise<any>;
    private _handleSelectNode;
    private _handleExpandOptions;
    componentWillRender(): void;
    private autoExpandAllHandler;
    private disableAllHandler;
    componentWillLoad(): void;
    private diselectAllHandler;
    render(): HTMLNovaTreeElement;
    private _handleCheckEvent;
    private handleChild;
    private _generateDefaultNodeKeys;
    private autoSelectAllHandler;
}
