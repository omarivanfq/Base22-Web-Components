import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h
} from "@stencil/core";

@Component({
  tag: "nova-tree",
  styleUrl: "nova-tree.scss",
  shadow: true
})
export class NovaTree {
  //Element
  @Element() public el;

  //Props
  /**
   *  Common attributes
   */
  @Prop({ mutable: true }) public data?: any = { items: [] };
  /**
   *  Common attributes
   */
  @Prop({ mutable: true }) public configuration?: object = {};
  /**
   *  Common attributes
   */
  @Prop({ mutable: true }) public styling?: object = {};
  @Prop() public autoExpandParent: boolean;
  @Prop() public defaultExpandAll: boolean;
  @Prop() public disableTree: boolean;
  @Prop() public blockNode: boolean;

  @Prop() public multiple: boolean;
  //@Prop() public autoExpandTopLevel: boolean = true;s
  @Prop() public checkable: boolean = false;
  @Prop() public selectable: boolean;
  @Prop() public checkStrictly: boolean;
  @Prop() public selected;
  //@Prop() public defaultExpandAll: boolean = false;
  @Prop() public checked: boolean;
  @Prop() public nodeKey: string;
  @Prop() public disabled: boolean;
  @Prop() public styles: object = {};
  @Event() public select: EventEmitter;

  private autoExpandAllHandler(node): void {
    node.expanded = true;
    if (node.subnodes.length) {
      node.subnodes.map(subnode => this.autoExpandAllHandler(subnode));
    }
  }

  private disableAllHandler(node): void {
    node.disableCheckbox = true;
    if (node.subnodes.length) {
      node.subnodes.map(subnode => this.disableAllHandler(subnode));
    }
  }

  public componentWillLoad(): void {
    this.data.items = NovaTree.treeData;

    if (this.autoExpandParent) {
      //console.log("entro");
      this.data.items.map(parent => {
        parent.expanded = true;
      });
    }

    if (this.defaultExpandAll) {
      //console.log("entro");
      //NovaTree.treeData.map(parent => {
      //  parent.expanded = true;
      this.data.items.map(parent => {
        this.autoExpandAllHandler(parent);
      });
    }

    if (this.disableTree) {
      //console.log("entro");
      //NovaTree.treeData.map(parent => {
      //  parent.expanded = true;
      this.data.items.map(parent => {
        this.disableAllHandler(parent);
      });
    }

    // NovaTree.treeData;
  }
  //
  // @Watch("selected")
  // public selectRecursivo(newValue: boolean, _oldValue: boolean): void {
  //   if (newValue) {
  //     console.log(" multiple true");
  //     return;
  //   } else {
  //     console.log(" multiple false");
  //     //
  //     // NovaTree.treeData.map(parent => {
  //     //   this.diselectAllHandler(parent);
  //     // });
  //   }
  // }
  private diselectAllHandler(node): void {
    node.selected = false;
    if (node.subnodes.length) {
      node.subnodes.map(subnode => this.diselectAllHandler(subnode));
    }
  }

  private static treeData = [
    {
      text: "happy",
      nodeKey: "0",
      disableCheckbox: false,
      disabled: false,
      selected: false,
      checked: false,
      expanded: false,
      subnodes: [
        {
          text: "Water",
          nodeKey: "0-0",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Coffee",
          nodeKey: "0-1",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: [
            {
              text: "Coffee",
              nodeKey: "0-1-0",
              disableCheckbox: false,
              disabled: false,
              selected: false,
              checked: false,
              expanded: false,
              subnodes: []
            },
            {
              text: "Whatever",
              nodeKey: "0-1-1",
              disableCheckbox: false,
              disabled: false,
              selected: false,
              checked: false,
              expanded: false,
              subnodes: [
                {
                  text: "Coffee",
                  nodeKey: "0-1-1-0",
                  disableCheckbox: false,
                  disabled: false,
                  selected: false,
                  checked: false,
                  expanded: false,
                  subnodes: []
                },
                {
                  text: "Whatever",
                  nodeKey: "0-1-1-1",
                  disableCheckbox: false,
                  disabled: false,
                  selected: false,
                  checked: false,
                  expanded: false,
                  subnodes: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      text: "bebidas",
      nodeKey: "1",
      disableCheckbox: false,
      disabled: false,
      selected: false,
      checked: false,
      expanded: false,
      subnodes: [
        {
          text: "Water",
          nodeKey: "1-0",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Coffee",
          nodeKey: "1-1",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Tea",
          nodeKey: "1-2",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: []
        }
      ]
    }
  ];

  public render(): HTMLNovaTreeElement {
    return (
      <ul id="topLevelUL">
        {this.data.items.map((child): HTMLLIElement => this.handleChild(child))}
      </ul>
    );
  }

  private _handleSelectEvent(): void {
    const nodes = this.el.shadowRoot.querySelectorAll("nova-tree-node");
    const nodesArr = Array.prototype.slice.call(nodes);
    this.select.emit({
      checkedKeys: nodesArr
        .filter((node): boolean => node.checked)
        .map(node => node.nodeKey)
    });
  }

  private handleChild(child): HTMLLIElement {
    return (
      <li>
        <nova-tree-node
          blockNode={this.blockNode}
          text={child.text}
          nodeKey={child.nodeKey}
          checkable={this.checkable}
          checkStrictly={this.checkStrictly}
          multiple={this.multiple}
          disableCheckbox={child.disableCheckbox}
          disabled={child.disabled}
          selected={this.selected}
          selectable={this.selectable}
          checked={child.checked}
          expanded={child.expanded}
          subnodes={child.subnodes}
          onCheck={(): void => this._handleSelectEvent()}
        ></nova-tree-node>
      </li>
    );
  }

  private _generateDefaultNodeKeys(node, index, parentnodeKey = ""): void {
    if (node.nodeKey == null) {
      if (parentnodeKey) {
        node.nodeKey = parentnodeKey + "-" + index;
      } else {
        node.nodeKey = index.toString;
      }
    }
    if (node.subnodes.length) {
      node.subnodes.map((subnode, index): void => {
        this._generateDefaultNodeKeys(subnode, index, node.nodeKey);
      });
    }
  }
}
