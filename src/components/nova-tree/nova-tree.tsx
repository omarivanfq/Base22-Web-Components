import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  Watch,
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
  @Prop() public selectable: boolean = false;
  @Prop() public checkStrictly: boolean;
  @Prop() public selected;
  @Prop() public checked: boolean;
  @Prop() public nodeKey: string;
  @Prop() public disabled: boolean;
  @Prop() public styles: object = {};
  @Event() public check: EventEmitter;
  @Prop() public selectedKeys: string[] = [];
  @Event() public selectNode: EventEmitter;

  @Watch("data")
  public dataChange(newValue: any, _oldValue: any): void {
    const nodes = this.el.shadowRoot.querySelectorAll("nova-tree-node");
    const nodesArr = Array.prototype.slice.call(nodes);
    this._updateCheckboxes(newValue.items, nodesArr);
    this._handleExpandOptions();
  }

  private _handleSelectNode(key:string, selected:boolean):void {
    if (this.selectable) {
      if (this.multiple) {
        if (selected) {
          this.selectedKeys.push(key);
        }
        else {
          this.selectedKeys.splice(this.selectedKeys.indexOf(key), 1);
        }
      }
      else {
        const nodes = this.el.shadowRoot.querySelectorAll("nova-tree-node");
        if (selected) {
          nodes.forEach(node => node.selected = node.nodeKey === key);
          this.selectedKeys = [key];
        }
        else {
          nodes.forEach(node => node.selected = false);
          this.selectedKeys = [];
        }
      }
      this.selectNode.emit({selectedKeys: this.selectedKeys});
    }
  }

  private _handleExpandOptions() {
    if (this.defaultExpandAll) {
      this.data.items.map(parent => {
        this.autoExpandAllHandler(parent);
      });
    }
    if (this.autoExpandParent) {
      this.data.items.map(parent => {
        parent.expanded = true;
      });
    }
  }

  public componentWillRender(): void {
    this._handleExpandOptions();
  }

  private _updateCheckboxes(updatedNodes, nodes) {
    updatedNodes.forEach(updatedNode => {
      var node = nodes.find(node => node.nodeKey === updatedNode.nodeKey);
      node.checked = updatedNode.checked;
      node.disableCheckbox = updatedNode.disableCheckbox;
      if (updatedNode.subnodes.length > 0) {
        this._updateCheckboxes(updatedNode.subnodes, nodes);
      }
    });
  }

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

    this._handleExpandOptions();

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
          disabled: true,
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
                  disabled: true,
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
          disabled: true,
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

  private _handleCheckEvent(): void {
    const nodes = this.el.shadowRoot.querySelectorAll("nova-tree-node");
    const nodesArr = Array.prototype.slice.call(nodes);
    this.check.emit({
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
          text={child.nodeKey}
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
          onCheckNode={(): void => this._handleCheckEvent()}
          onSelectingNode={e => this._handleSelectNode(e.detail.key, e.detail.selected)}
        />
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

  @Watch("multiple")
  public multipleWatchHandler(newValue: boolean): void {
    NovaTree.treeData.map((parent): void => {
      this.autoSelectAllHandler(parent, newValue);
    });
  }

  private autoSelectAllHandler(node, newValue): void {
    console.log(node.selected);
    node.selected = newValue;
    if (node.subnodes.length) {
      node.subnodes.map(subnode =>
        this.autoSelectAllHandler(subnode, newValue)
      );
    }
  }
}
