import { EventEmitter } from "../../../dist/types/stencil.core";
export declare class NovaRate {
    /**
     * Element
     */
    private el;
    /**
     * Props
     */
    /**
     *  This property allows clearing by setting the value to 0
     */
    allowClear: boolean;
    /**
     *  This property allow half values
     */
    allowHalf: boolean;
    /**
     *  This property focus the ul when component is mounted
     */
    autoFocus: boolean;
    /**
     *  This property sets the caracter to display as symbol
     */
    character: string;
    /**
     *  This property replaces character for an icon
     */
    icon: string;
    /**
     *  This property makes the component "read only"
     */
    disabled: boolean;
    /**
     *  This property sets the number of stars
     */
    count: number;
    /**
     *  This property sets the initial value
     */
    defaultValue: number;
    /**
     *  This property sets the size of the rate component
     */
    size: number;
    /**
     *  This property sets the color
     */
    color: string;
    /**
     *  This property sets the initial value
     */
    configuration?: any;
    /**
     *  State
     */
    starList: Array<object>;
    value: number;
    isComponentReady: boolean;
    /**
     *  Public API Events
     */
    onBlur: EventEmitter;
    onChange: EventEmitter;
    onFocus: EventEmitter;
    onHoverChange: EventEmitter;
    onKeyDown: EventEmitter;
    /**
     *  Public API Methods
     */
    blurComponent(): Promise<void>;
    focusComponent(): Promise<void>;
    /**
     * Lifecycle methods
     */
    componentWillLoad(): void;
    componentDidLoad(): void;
    private getCharacterOrIcon;
    /**
     * Event handlers
     */
    private handleSetValue;
    private handleGenerateStarList;
    handleOnKeyPressed(e: any): void;
    private _handleOnHover;
    render(): HTMLNovaRateElement;
}
