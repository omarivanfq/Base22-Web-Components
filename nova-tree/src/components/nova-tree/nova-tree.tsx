import { Component, Element, Prop, h } from "@stencil/core";

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
  @Prop({ mutable: true }) public data: object = {};
  /**
   *  Common attributes
   */
  @Prop({ mutable: true }) public configuration: object = {};
  /**
   *  Common attributes
   */
  @Prop({ mutable: true }) public styling: object = {};
  @Prop() public autoExpandParent: boolean;
  @Prop() public defaultExpandAll: boolean;
  @Prop() public disableTree: boolean;
  //@Prop() public autoExpandTopLevel: boolean = true;
  @Prop() public blockNode: boolean = false;
  @Prop() public checkable: boolean = false;
  @Prop() public checkStrictly: boolean;
  //@Prop() public defaultExpandAll: boolean = false;
  @Prop() public checked: boolean;
  @Prop() public nodeKey: string;
  @Prop() public disabled: boolean;
  @Prop() public styles: object = {};

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
    //const ul = this.element.shadowRoot.children.item(1);
    //this.autoExpandTopLevel ? this.handleAutoExpand(ul) : undefined;
    //this.defaultExpandAll ? this.handleAutoExpand(ul) : undefined;
    //
    if (this.autoExpandParent) {
      //console.log("entro");
      NovaTree.treeData.map(parent => {
        parent.expanded = true;
      });
    }

    if (this.defaultExpandAll) {
      //console.log("entro");
      //NovaTree.treeData.map(parent => {
      //  parent.expanded = true;
      NovaTree.treeData.map(parent => {
        this.autoExpandAllHandler(parent);
      });
    }

    if (this.disableTree) {
      //console.log("entro");
      //NovaTree.treeData.map(parent => {
      //  parent.expanded = true;
      NovaTree.treeData.map(parent => {
        this.disableAllHandler(parent);
      });
    }

    NovaTree.treeData;
  }

  private static treeData = [
    {
      text: "happy",
      nodeKey: "0",
      disableCheckbox: false,
      disabled: false,
      checked: false,
      expanded: false,
      subnodes: [
        {
          text: "Water",
          nodeKey: "0-0",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Coffee",
          nodeKey: "0-1",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
          subnodes: [
            {
              text: "Coffee",
              nodeKey: "0-1-0",
              disableCheckbox: false,
              disabled: false,
              checked: false,
              expanded: false,
              subnodes: []
            },
            {
              text: "Whatever",
              nodeKey: "0-1-1",
              disableCheckbox: false,
              disabled: false,
              checked: false,
              expanded: false,
              subnodes: [
                {
                  text: "Coffee",
                  nodeKey: "0-1-1-0",
                  disableCheckbox: false,
                  disabled: false,
                  checked: false,
                  expanded: false,
                  subnodes: []
                },
                {
                  text: "Whatever",
                  nodeKey: "0-1-1-1",
                  disableCheckbox: false,
                  disabled: false,
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
      text: "Beverages",
      nodeKey: "1",
      disableCheckbox: false,
      disabled: false,
      checked: false,
      expanded: false,
      subnodes: [
        {
          text: "Water",
          nodeKey: "1-0",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Coffee",
          nodeKey: "1-1",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Tea",
          nodeKey: "1-2",
          disableCheckbox: false,
          disabled: false,
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
        {NovaTree.treeData.map(
          (child): HTMLLIElement => this.handleChild(child)
        )}
      </ul>
    );
  }

  private handleChild(child): HTMLLIElement {
    return (
      <li>
        <nova-tree-node
          text={child.text}
          key={child.nodeKey}
          nodeKey={child.nodeKey}
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

  private _generateDefaultnodeKeys(node, index, parentnodeKey = ""): void {
    if (node.nodeKey == null) {
      if (parentnodeKey) {
        node.nodeKey = parentnodeKey + "-" + index;
      } else {
        node.nodeKey = index.toString;
      }
    }
    if (node.subnodes.length) {
      node.subnodes.map((subnode, index): void => {
        this._generateDefaultnodeKeys(subnode, index, node.nodeKey);
      });
    }
  }
}
