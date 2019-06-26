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
  @Prop() public blockNode: boolean;

  @Prop() public multiple: boolean;
  //@Prop() public autoExpandTopLevel: boolean = true;s
  @Prop() public checkable: boolean = false;
  @Prop() public selectable: boolean;
  @Prop() public checkStrictly: boolean;
  @Prop() public selected;
  //@Prop() public defaultExpandAll: boolean = false;
  @Prop() public checked: boolean;
  @Prop() public key: string;
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
      key: "0-0",
      disableCheckbox: false,
      disabled: false,
      selected: false,
      checked: false,
      expanded: false,
      subnodes: [
        {
          text: "Water",
          key: "0-0-0",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Coffee",
          key: "0-0-1",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: [
            {
              text: "Coffee",
              key: "0-0-1-0",
              disableCheckbox: false,
              disabled: false,
              selected: false,
              checked: false,
              expanded: false,
              subnodes: []
            },
            {
              text: "Whatever",
              key: "0-0-1-0",
              disableCheckbox: false,
              disabled: false,
              selected: false,
              checked: false,
              expanded: false,
              subnodes: [
                {
                  text: "Coffee",
                  key: "0-0-1-0",
                  disableCheckbox: false,
                  disabled: false,
                  selected: false,
                  checked: false,
                  expanded: false,
                  subnodes: []
                },
                {
                  text: "Whatever",
                  key: "0-0-1-0",
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
      text: "Beverages",
      key: "0-1",
      disableCheckbox: false,
      disabled: false,
      selected: false,
      checked: false,
      expanded: false,
      subnodes: [
        {
          text: "Water",
          key: "0-1-0",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Coffee",
          key: "0-1-1",
          disableCheckbox: false,
          disabled: false,
          selected: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Tea",
          key: "0-1-2",
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

  private handleChild(child, index): HTMLLIElement {
    return (
      <li>
        <nova-tree-node
          blockNode={this.blockNode}
          text={child.text}
          key={index}
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
        ></nova-tree-node>
      </li>
    );
  }

  public render(): HTMLNovaTreeElement {
    return (
      <ul id="topLevelUL">
        {NovaTree.treeData.map(
          (child, index): HTMLLIElement => this.handleChild(child, index)
        )}
      </ul>
    );
  }
}
