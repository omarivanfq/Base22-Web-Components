import { FunctionalComponent } from "../../../../dist/types/stencil.core";
interface TransferOperationButtonsProps {
    sourceIsActive: boolean;
    targetIsActive: boolean;
    moveToSource: Function;
    moveToTarget: Function;
    sourceLabel: string;
    targetLabel: string;
    style: any;
}
export declare const TransferOperationButtons: FunctionalComponent<TransferOperationButtonsProps>;
export {};
