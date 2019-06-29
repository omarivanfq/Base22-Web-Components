import { FunctionalComponent, h } from "@stencil/core";

// interface TransferSearchBoxLabels {
//     placeholder: string;
// };

interface TransferSearchBoxProps {
    placeholder: string;
    disabled: boolean;
    handleQuery: any;
}

export const TransferSearchBox: FunctionalComponent<
TransferSearchBoxProps
> = ({ disabled, placeholder, handleQuery }) => {
    return (
      <span class="search-container">
        <input
          disabled={ disabled }
          onKeyUp={ handleQuery } 
          placeholder={ placeholder }/>
      </span>
    );
}