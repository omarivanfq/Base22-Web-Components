/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
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
  }
}

declare global {


  interface HTMLNovaRateElement extends Components.NovaRate, HTMLStencilElement {}
  var HTMLNovaRateElement: {
    prototype: HTMLNovaRateElement;
    new (): HTMLNovaRateElement;
  };
  interface HTMLElementTagNameMap {
    'nova-rate': HTMLNovaRateElement;
  }
}

declare namespace LocalJSX {
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
    * Public API Events
    */
    'onOnBlur'?: (event: CustomEvent<any>) => void;
    'onOnChange'?: (event: CustomEvent<any>) => void;
    'onOnFocus'?: (event: CustomEvent<any>) => void;
    'onOnHoverChange'?: (event: CustomEvent<any>) => void;
    'onOnKeyDown'?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    'nova-rate': NovaRate;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


