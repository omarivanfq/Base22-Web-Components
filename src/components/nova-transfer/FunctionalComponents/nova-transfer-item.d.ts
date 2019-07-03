import { FunctionalComponent } from "../../../../dist/types/stencil.core";
interface TransferItem {
    renderItem: Function;
    handleSelect: Function;
    disabled: boolean;
    highlight: boolean;
    checked: boolean;
}
export declare const TransferItem: FunctionalComponent<TransferItem>;
export {};
