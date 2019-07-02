import { FunctionalComponent, h } from "@stencil/core";

interface TreeSelectChipProps {
  key: string;
  toBeRemoved: boolean;
  text: string;
  removeHandler: Function;
}

export const TreeSelectChip: FunctionalComponent<TreeSelectChipProps> = ({
  key,
  toBeRemoved,
  text,
  removeHandler
}) => {
  return (
    <span
      key={key}
      class={"option-selected " + (toBeRemoved ? "removed" : "")}
      title={key}
      onClick={e => e.stopPropagation()}
    >
      {text}
      <span
        onClick={e => {
          e.stopImmediatePropagation();
          removeHandler();
        }}
      >
        <nova-font-awesome icon-name="times" size="lg" />
      </span>
    </span>
  );
};
