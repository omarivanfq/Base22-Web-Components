# Tree-node

## checkable

```js{11}
@Prop() public checkable: boolean = false;
```

:::tip Implementacion

```
private handleChild(child): HTMLLIElement {
  return (
    <li>
      <nova-tree-node
        text={child.text}
        key={this.key}
        checkable={this.checkable}
        checkStrictly={this.checkStrictly}
        disableCheckbox={child.disableCheckbox}
        disabled={child.disabled}
        checked={child.checked}
        expanded={child.expanded}
        subnodes={child.subnodes}
      ></nova-tree-node>
    </li>
  );
}
```

:::

## disableCheckbox

```js
@Prop() public disableCheckbox: boolean = false;
@Prop() public disabled: boolean = false;


<nova-checkbox
  disabled={this.disableCheckbox}
  checked={this.checked}
  onClick={(e): void => this.handleCheck(e)}
/>

```

## isLeaf

```js
@State() private isLeaf: boolean = true;


  @Watch("subnodes")
  public updateIsLeaf(
    newValue: NovaTreeNode[],
    oldValue: NovaTreeNode[]
  ): void {
    if (newValue.length && oldValue.length) {
      return;
    }
    this.isLeaf = !newValue.length;
  }
```

:::tip Implementacion

```js
if (this.isLeaf) {
  return (
    <Host>
      <span class="caretsecret"></span>
      <nova-checkbox
        disabled={this.disableCheckbox}
        checked={this.checked}
        onClick={(e): void => this.handleCheck(e)}
      />
      <span>{this.text}</span>
    </Host>
  );

```

:::

## key

:::warning Operacion
Se implementó igual que defaultExpandedKeys

```js {4}
private static treeData = [
  {
    text: "happy",
    key: "0-0",
    disableCheckbox: false,
    disabled: false,
    checked: false,
    expanded: false,
    subnodes: [
      {
        text: "Water",
        key: "0-0-0",
        disableCheckbox: false,

```

:::
