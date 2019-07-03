import { FunctionalComponent, h } from "@stencil/core";

interface TransferOperationButtonsProps {
    sourceIsActive: boolean;
    targetIsActive: boolean;
    moveToSource: Function;
    moveToTarget: Function;
    sourceLabel: string;
    targetLabel: string;
    style: any;
}

export const TransferOperationButtons: FunctionalComponent<
TransferOperationButtonsProps
> = ({ sourceIsActive, targetIsActive, moveToSource,
     moveToTarget, sourceLabel, targetLabel, style }) => {
    return (
        <span class="operation-buttons" style={style}>
        <button
          class={sourceIsActive? "btn-active" : ""}
          onClick={() => moveToTarget()}
        >
          {">"}
          <span> {targetLabel}</span>
        </button>
        <button
          class={targetIsActive? "btn-active" : ""}
          onClick={() => moveToSource()}
        >
          {"<"}
          <span> {sourceLabel}</span>
        </button>
      </span>
    );
}