# nova-tree-select



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type       | Default                 |
| --------------- | ---------------- | ----------- | ---------- | ----------------------- |
| `blockNode`     | `block-node`     |             | `boolean`  | `undefined`             |
| `checkable`     | `checkable`      |             | `boolean`  | `undefined`             |
| `data`          | `data`           |             | `any`      | `{ items: TREE_ITEMS }` |
| `disabled`      | `disabled`       |             | `boolean`  | `false`                 |
| `dropdownStyle` | `dropdown-style` |             | `any`      | `{}`                    |
| `maxTagCount`   | `max-tag-count`  |             | `number`   | `3`                     |
| `multiple`      | `multiple`       |             | `boolean`  | `undefined`             |
| `placeholder`   | `placeholder`    |             | `string`   | `""`                    |
| `selectedKeys`  | --               |             | `string[]` | `undefined`             |
| `styles`        | `styles`         |             | `any`      | `{}`                    |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `onChange` |             | `CustomEvent<any>` |
| `onSelect` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [nova-tree](../nova-tree)
- [nova-font-awesome](../FontAwesome)

### Graph
```mermaid
graph TD;
  nova-tree-select --> nova-tree
  nova-tree-select --> nova-font-awesome
  nova-tree --> nova-tree-node
  nova-tree-node --> nova-checkbox
  nova-tree-node --> nova-tree-node
  style nova-tree-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
