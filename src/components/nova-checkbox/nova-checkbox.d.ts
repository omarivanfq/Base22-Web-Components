import { EventEmitter } from "../../../dist/types/stencil.core";
export declare class NovaCheckbox {
    checked: boolean;
    disabled: boolean;
    styles: any;
    handleClick: Function;
    clicked: EventEmitter;
    render(): HTMLNovaCheckboxElement;
}
