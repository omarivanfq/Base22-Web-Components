# Tree

Primero los buleanos

## Update blockNode

<TreeNodeWrapper/>

:::warning Tenemos un bug en implementacion

```js{4}
private handleChild(child, index): HTMLLIElement {
  return (
    <li>
      <nova-tree-node
        blockNode //={this.blockNode}
        text={child.text}
        key={index}
        checkable={this.checkable}
        checkStrictly={this.checkStrictly}
        disableCheckbox={child.disableCheckbox}
        disabled={child.disabled}
        selected={this.selected}
        checked={child.checked}
        expanded={child.expanded}
        subnodes={child.subnodes}
      ></nova-tree-node>
    </li>
  );
}

```

:::

## autoExpandParent

```js

@Prop() public autoExpandParent: boolean;

public componentWillLoad(): void {
  if (this.autoExpandParent) {
    MyComponent.treeData.map(parent => {
      parent.expanded = true;
    });
  }

```

## checkStrictly

```js
@Prop({ reflect: true }) public checkStrictly: boolean = false;

@Watch("checked")
public checkRecursivo(newValue: boolean, _: boolean) {
  if (this.checkStrictly) {
    return;
  }

  this.subnodes.map(nodo => {
    nodo.checked = newValue;
  });
}

```

## defaultExpandAll

```js
@Prop() public defaultExpandAll: boolean = true;

if (this.defaultExpandAll) {
  MyComponent.treeData.map(parent => {
    this.autoExpandAllHandler(parent);
  });
}

private disableAllHandler(node): void {
  node.disableCheckbox = true;
  if (node.subnodes.length) {
    node.subnodes.map(subnode => this.disableAllHandler(subnode));
  }
}

```

## defaultExpandParent

:::tip Descripcion
"auto expand parent treeNodes when init "

Similar a la operacion de autoExpandParent

:::

## disabledTree(disabled)

```js
  public componentWillLoad(): void {
    if (this.disableTree) {
      MyComponent.treeData.map(parent => {
        this.disableAllHandler(parent);
      });
    }
  }

  private disableAllHandler(node): void {
    node.disableCheckbox = true;
    if (node.subnodes.length) {
      node.subnodes.map(subnode => this.disableAllHandler(subnode));
    }
  }
```

Ahora pasamos con los no booleans

## defaultExpandedKeys

:::tip Operacion
Se implementó en el codigo recibido

```js {8}
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

## defaultSelectedKeys

:::warning Operacion
Se implementó en el codigo recibido como "checked"

<< Specifies the keys of the default selected treeNodes>>

```js {7}
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

## expandedKeys

:::danger Operacion
Se implementó igual que defaultExpandedKeys

```js {8}
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

## onCheck

```js
@Watch("checked")
public checkRecursivo(newValue: boolean, _: boolean) {
  if (this.checkStrictly) {
    return;
  }

  this.subnodes.map(nodo => {
    nodo.checked = newValue;
  });
}
```

## onExpand

```js
@Watch("expanded")
public onExpand(newValue: boolean, _: boolean) {
  //temp = newValue;
  if (newValue) {
    //console.log("Aqui es para meter funcion on expand");
  } else {
    //console.log("Para meter funcion on collapse");
  }
}
```

## onLoad

```js
public componentWillLoad(): void {
  this.isLeaf = !this.subnodes.length;
}
```
