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
  interface NovaTree {
    'autoExpandParent': boolean;
    'blockNode': boolean;
    'checkStrictly': boolean;
    'checkable': boolean;
    'checked': boolean;
    /**
    * Common attributes
    */
    'configuration': object;
    /**
    * Common attributes
    */
    'data': object;
    'defaultExpandAll': boolean;
    'disableTree': boolean;
    'disabled': boolean;
    'key': string;
    'multiple': boolean;
    'selected': any;
    'styles': object;
    /**
    * Common attributes
    */
    'styling': object;
  }
  interface NovaTreeNode {
    'autoExpandParent': boolean;
    'blockNode': boolean;
    'checkStrictly': boolean;
    'checkable': boolean;
    'checked': boolean;
    'defaultExpandAll': boolean;
    'disableCheckbox': boolean;
    'disabled': boolean;
    'expanded': boolean;
    'key': string;
    'selected': boolean;
    'subnodes': NovaTreeNode[];
    'text': string;
  }
}

declare global {


  interface HTMLNovaCheckboxElement extends Components.NovaCheckbox, HTMLStencilElement {}
  var HTMLNovaCheckboxElement: {
    prototype: HTMLNovaCheckboxElement;
    new (): HTMLNovaCheckboxElement;
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
  interface HTMLElementTagNameMap {
    'nova-checkbox': HTMLNovaCheckboxElement;
    'nova-tree': HTMLNovaTreeElement;
    'nova-tree-node': HTMLNovaTreeNodeElement;
  }
}

declare namespace LocalJSX {
  interface NovaCheckbox extends JSXBase.HTMLAttributes<HTMLNovaCheckboxElement> {
    'checked'?: boolean;
    'disabled'?: boolean;
    'handleClick'?: Function;
    'onNovaCheckboxClicked'?: (event: CustomEvent<any>) => void;
    'styles'?: any;
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
    'data'?: object;
    'defaultExpandAll'?: boolean;
    'disableTree'?: boolean;
    'disabled'?: boolean;
    'key'?: string;
    'multiple'?: boolean;
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
    'key'?: string;
    'onNovaTreeNodeCheckedChange'?: (event: CustomEvent<any>) => void;
    'selected'?: boolean;
    'subnodes'?: NovaTreeNode[];
    'text': string;
  }

  interface IntrinsicElements {
    'nova-checkbox': NovaCheckbox;
    'nova-tree': NovaTree;
    'nova-tree-node': NovaTreeNode;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


