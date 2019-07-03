import { FunctionalComponent, h } from "@stencil/core";

interface TransferItem {
   renderItem: Function;
   handleSelect: Function;
   disabled: boolean;
   highlight: boolean;
   checked: boolean;
}

export const TransferItem: FunctionalComponent<
TransferItem
> = ({ renderItem, handleSelect, disabled, highlight, checked }) => {
  
    var checkboxProps = {
        checked,
        disabled,
        styles: { marginRight: "5px" }
    };
    var spanProps = {
        onClick: e => {
          e.preventDefault();
          handleSelect();
        },
        class:
          "item " +
          (disabled ? "disabled" : "") +
          (highlight? " highlight" : "") // animation that highlights items that were just transfered
      };
    return (
        <li>
            <span {...spanProps}>
            <nova-checkbox {...checkboxProps}></nova-checkbox>
            { renderItem() }
            </span>
        </li>      
    );
}