import { FunctionalComponent, h } from "@stencil/core";

interface TransferColumnHeaderProps {
   // direction: string;
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

export const TransferColumnHeader: FunctionalComponent<
TransferColumnHeaderProps
> = ({ selectedCount, total, totalEnabled, handleSelectAll, title, 
        unit, units, disabled, showSelectAll }) => {
  
    var checkboxProps = {
        handleClick: () => handleSelectAll(),
        checked: selectedCount === totalEnabled && totalEnabled > 0,
        disabled: disabled
    };

    return (
      <header class="column-header">
        <span>
          {
            showSelectAll 
            ? <nova-checkbox {...checkboxProps}></nova-checkbox>
            : null
          }
          <span>
            { selectedCount != 0 ? selectedCount + "/" : "" }
            { total }{" "}
            { 
              total > 1
              ? units
              : unit 
            }
          </span>
        </span>
        <span> { title } </span>
      </header>
    );
}