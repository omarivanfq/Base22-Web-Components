import { FunctionalComponent } from "../../../../dist/types/stencil.core";
interface TransferColumnHeaderProps {
    title: string;
    selectedCount: number;
    total: number;
    totalEnabled: number;
    handleSelectAll: Function;
    unit: string;
    units: string;
    disabled: boolean;
    showSelectAll: boolean;
}
export declare const TransferColumnHeader: FunctionalComponent<TransferColumnHeaderProps>;
export {};
