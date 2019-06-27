/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface NovaCheckbox {
    'checked': boolean;
    'disabled': boolean;
    'handleClick': Function;
    'styles': any;
  }
  interface NovaRate {
    /**
    * Props This property allow to clear by setting value to 0
    */
    'allowClear': boolean;
    /**
    * This property allow half values
    */
    'allowHalf': boolean;
    /**
    * This property focus the ul when component is mounted
    */
    'autoFocus': boolean;
    /**
    * Public API Methods
    */
    'blurComponent': () => Promise<void>;
    /**
    * This property sets the caracter to display as symbol
    */
    'character': string;
    /**
    * This property sets the number of stars
    */
    'count': number;
    /**
    * This property sets the initial value
    */
    'defaultValue': number;
    /**
    * This property makes the component "read only"
    */
    'disabled': boolean;
    'focusComponent': () => Promise<void>;
    /**
    * This property replaces character for an icon
    */
    'icon': string;
  }
  interface NovaTransfer {
    'columnStyle': any;
    'configuration'?: any;
    'data'?: any;
    'disabled': boolean;
    'filterOption': Function;
    'handleSelect': (key: string) => Promise<void>;
    'operationStyle': any;
    'renderItem': Function;
    'showSearch': boolean;
    'showSelectAll': boolean;
    'styling'?: any;
    'wrapperStyle': any;
  }
  interface NovaTree {
    'autoExpandParent': boolean;
    'blockNode': boolean;
    'checkStrictly': boolean;
    'checkable': boolean;
    'checked': boolean;
    /**
    * Common attributes
    */
    'configuration'?: object;
    /**
    * Common attributes
    */
    'data'?: any;
    'defaultExpandAll': boolean;
    'disableTree': boolean;
    'disabled': boolean;
    'multiple': boolean;
    'nodeKey': string;
    'selectable': boolean;
    'selected': any;
    'styles': object;
    /**
    * Common attributes
    */
    'styling'?: object;
  }
  interface NovaTreeNode {
    'autoExpandParent': boolean;
    'blockNode'?: boolean;
    'checkStrictly': boolean;
    'checkable'?: boolean;
    'checked': boolean;
    'defaultExpandAll': boolean;
    'disableCheckbox': boolean;
    'disabled': boolean;
    'expanded': boolean;
    'multiple': boolean;
    'nodeKey': string;
    'selectable'?: boolean;
    'selected': boolean;
    'subnodes': NovaTreeNode[];
    'text': string;
  }
  interface NovaTreeSelect {}
}

declare global {


  interface HTMLNovaCheckboxElement extends Components.NovaCheckbox, HTMLStencilElement {}
  var HTMLNovaCheckboxElement: {
    prototype: HTMLNovaCheckboxElement;
    new (): HTMLNovaCheckboxElement;
  };

  interface HTMLNovaRateElement extends Components.NovaRate, HTMLStencilElement {}
  var HTMLNovaRateElement: {
    prototype: HTMLNovaRateElement;
    new (): HTMLNovaRateElement;
  };

  interface HTMLNovaTransferElement extends Components.NovaTransfer, HTMLStencilElement {}
  var HTMLNovaTransferElement: {
    prototype: HTMLNovaTransferElement;
    new (): HTMLNovaTransferElement;
  };

  interface HTMLNovaTreeElement extends Components.NovaTree, HTMLStencilElement {}
  var HTMLNovaTreeElement: {
    prototype: HTMLNovaTreeElement;
    new (): HTMLNovaTreeElement;
  };

  interface HTMLNovaTreeNodeElement extends Components.NovaTreeNode, HTMLStencilElement {}
  var HTMLNovaTreeNodeElement: {
    prototype: HTMLNovaTreeNodeElement;
    new (): HTMLNovaTreeNodeElement;
  };

  interface HTMLNovaTreeSelectElement extends Components.NovaTreeSelect, HTMLStencilElement {}
  var HTMLNovaTreeSelectElement: {
    prototype: HTMLNovaTreeSelectElement;
    new (): HTMLNovaTreeSelectElement;
  };
  interface HTMLElementTagNameMap {
    'nova-checkbox': HTMLNovaCheckboxElement;
    'nova-rate': HTMLNovaRateElement;
    'nova-transfer': HTMLNovaTransferElement;
    'nova-tree': HTMLNovaTreeElement;
    'nova-tree-node': HTMLNovaTreeNodeElement;
    'nova-tree-select': HTMLNovaTreeSelectElement;
  }
}

declare namespace LocalJSX {
  interface NovaCheckbox extends JSXBase.HTMLAttributes<HTMLNovaCheckboxElement> {
    'checked'?: boolean;
    'disabled'?: boolean;
    'handleClick'?: Function;
    'onClicked'?: (event: CustomEvent<any>) => void;
    'styles'?: any;
  }
  interface NovaRate extends JSXBase.HTMLAttributes<HTMLNovaRateElement> {
    /**
    * Props This property allow to clear by setting value to 0
    */
    'allowClear'?: boolean;
    /**
    * This property allow half values
    */
    'allowHalf'?: boolean;
    /**
    * This property focus the ul when component is mounted
    */
    'autoFocus'?: boolean;
    /**
    * This property sets the caracter to display as symbol
    */
    'character'?: string;
    /**
    * This property sets the number of stars
    */
    'count'?: number;
    /**
    * This property sets the initial value
    */
    'defaultValue'?: number;
    /**
    * This property makes the component "read only"
    */
    'disabled'?: boolean;
    /**
    * This property replaces character for an icon
    */
    'icon'?: string;
    /**
    * Public API Events
    */
    'onOnBlur'?: (event: CustomEvent<any>) => void;
    'onOnChange'?: (event: CustomEvent<any>) => void;
    'onOnFocus'?: (event: CustomEvent<any>) => void;
    'onOnHoverChange'?: (event: CustomEvent<any>) => void;
    'onOnKeyDown'?: (event: CustomEvent<any>) => void;
  }
  interface NovaTransfer extends JSXBase.HTMLAttributes<HTMLNovaTransferElement> {
    'columnStyle'?: any;
    'configuration'?: any;
    'data'?: any;
    'disabled'?: boolean;
    'filterOption'?: Function;
    'onFilter'?: (event: CustomEvent<any>) => void;
    'onScrollColumn'?: (event: CustomEvent<any>) => void;
    'onSearch'?: (event: CustomEvent<any>) => void;
    'onSelect'?: (event: CustomEvent<any>) => void;
    'onTransferColumn'?: (event: CustomEvent<any>) => void;
    'operationStyle'?: any;
    'renderItem'?: Function;
    'showSearch'?: boolean;
    'showSelectAll'?: boolean;
    'styling'?: any;
    'wrapperStyle'?: any;
  }
  interface NovaTree extends JSXBase.HTMLAttributes<HTMLNovaTreeElement> {
    'autoExpandParent'?: boolean;
    'blockNode'?: boolean;
    'checkStrictly'?: boolean;
    'checkable'?: boolean;
    'checked'?: boolean;
    /**
    * Common attributes
    */
    'configuration'?: object;
    /**
    * Common attributes
    */
    'data'?: any;
    'defaultExpandAll'?: boolean;
    'disableTree'?: boolean;
    'disabled'?: boolean;
    'multiple'?: boolean;
    'nodeKey'?: string;
    'onSelect'?: (event: CustomEvent<any>) => void;
    'selectable'?: boolean;
    'selected'?: any;
    'styles'?: object;
    /**
    * Common attributes
    */
    'styling'?: object;
  }
  interface NovaTreeNode extends JSXBase.HTMLAttributes<HTMLNovaTreeNodeElement> {
    'autoExpandParent'?: boolean;
    'blockNode'?: boolean;
    'checkStrictly'?: boolean;
    'checkable'?: boolean;
    'checked'?: boolean;
    'defaultExpandAll'?: boolean;
    'disableCheckbox'?: boolean;
    'disabled'?: boolean;
    'expanded'?: boolean;
    'multiple'?: boolean;
    'nodeKey'?: string;
    'onCheck'?: (event: CustomEvent<any>) => void;
    'selectable'?: boolean;
    'selected'?: boolean;
    'subnodes'?: NovaTreeNode[];
    'text': string;
  }
  interface NovaTreeSelect extends JSXBase.HTMLAttributes<HTMLNovaTreeSelectElement> {}

  interface IntrinsicElements {
    'nova-checkbox': NovaCheckbox;
    'nova-rate': NovaRate;
    'nova-transfer': NovaTransfer;
    'nova-tree': NovaTree;
    'nova-tree-node': NovaTreeNode;
    'nova-tree-select': NovaTreeSelect;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


