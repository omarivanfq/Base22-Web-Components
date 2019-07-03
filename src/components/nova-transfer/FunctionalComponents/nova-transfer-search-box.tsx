import { FunctionalComponent, h } from "@stencil/core";

interface TransferSearchBoxProps {
    placeholder: string;
    disabled: boolean;
    handleQuery: any;
    hidden: boolean;
}

export const TransferSearchBox: FunctionalComponent<
TransferSearchBoxProps
> = ({ disabled, placeholder, handleQuery, hidden }) => {
    return (
      hidden
        ? null 
        : <span class="search-container">
            <input
              disabled={ disabled }
              onKeyUp={ handleQuery } 
              placeholder={ placeholder }/>
          </span>
    );
}