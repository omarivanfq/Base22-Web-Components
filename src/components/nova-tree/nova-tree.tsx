import {
  Component,
  Element,
  Event,
  Method,
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
  @Prop({ mutable: true }) public data? = { items: [] };
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
  //@Prop() public autoExpandTopLevel: boolean = true;
  @Prop() public checkable: boolean = false;
  @Prop() public selectable: boolean = false;
  @Prop() public checkStrictly: boolean;
  @Prop() public selected;
  // @Prop() public checked: boolean;
  @Prop() public nodeKey: string;
  @Prop() public disabled: boolean;
  @Prop() public styles: object = {};
  @Prop() public selectedKeys: string[] = [];
  // @Prop() public checkedKeys: string[] = [];
  @Event() public select: EventEmitter;
  @Event() public check: EventEmitter;

  @Watch("data")
  public dataChange(_newValue, _oldValue): void {
    this._handleExpandOptions();
  }

  @Method()
  public async updateData(data) {
    this.data = data;
    const nodes = this.el.shadowRoot.querySelectorAll("nova-tree-node");
    const nodesArr = Array.prototype.slice.call(nodes);
    this._updateCheckboxes(data.items, nodesArr);
  }

  private _updateCheckboxes(updatedNodes, nodes): void {
    updatedNodes.forEach((updatedNode): void => {
      const node = nodes.find(
        (node): boolean => node.nodeKey === updatedNode.nodeKey
      );
      node.checked = updatedNode.checked;
      node.selected = updatedNode.selected;
      node.disableCheckbox = updatedNode.disableCheckbox;
      node.disabled = updatedNode.disabled;
      if (updatedNode.subnodes.length > 0) {
        this._updateCheckboxes(updatedNode.subnodes, nodes);
      }
    });
  }

  private _handleSelectNode(key: string, selected: boolean): void {
    if (this.selectable) {
      if (this.multiple) {
        if (selected) {
          this.selectedKeys.push(key);
        } else {
          this.selectedKeys.splice(this.selectedKeys.indexOf(key), 1);
        }
      } else {
        const nodes = this.el.shadowRoot.querySelectorAll("nova-tree-node");
        if (selected) {
          nodes.forEach(
            (node): boolean => (node.selected = node.nodeKey === key)
          );
          this.selectedKeys = [key];
        } else {
          nodes.forEach((node): boolean => (node.selected = false));
          this.selectedKeys = [];
        }
      }
      this.select.emit({ selectedKeys: this.selectedKeys, key, selected });
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
    // this.data.items = NovaTree.treeData;
    this._handleExpandOptions();
    if (this.disableTree) {
      this.data.items.map(parent => {
        this.disableAllHandler(parent);
      });
    }
  }

  private diselectAllHandler(node): void {
    node.selected = false;
    if (node.subnodes.length) {
      node.subnodes.map(subnode => this.diselectAllHandler(subnode));
    }
  }

  public render(): HTMLNovaTreeElement {
    return (
      <ul id="topLevelUL">
        {this.data.items.map((child): HTMLLIElement => this.handleChild(child))}
      </ul>
    );
  }

  private _handleCheckEvent(key: string, checked: boolean): void {
    // updating the items array if needed
    const checkedParent = this.data.items.find(
      (item): boolean => item.nodeKey === key
    );
    if (checkedParent) {
      checkedParent.checked = checked;
    }
    const nodes = this.el.shadowRoot.querySelectorAll("nova-tree-node");
    const nodesArr = Array.prototype.slice.call(nodes);
    setTimeout((): void => {
      // emitting check event
      this.check.emit({
        checkedKeys: nodesArr
          .filter((node): boolean => node.checked)
          .map((node): void => node.nodeKey),
        key,
        checked
      });
    }, 100);
  }

  private handleChild(child): HTMLLIElement {
    return (
      <li key={child.nodeKey}>
        <nova-tree-node
          //     key={child.nodeKey}
          blockNode={this.blockNode}
          text={child.text}
          key={child.nodeKey}
          nodeKey={child.nodeKey}
          checkable={this.checkable}
          checkStrictly={this.checkStrictly}
          multiple={this.multiple}
          disableCheckbox={child.disableCheckbox}
          disabled={child.disabled}
          selected={child.selected}
          selectable={this.selectable}
          checked={child.checked}
          expanded={child.expanded}
          subnodes={child.subnodes}
          onCheckNode={e =>
            this._handleCheckEvent(e.detail.key, e.detail.checked)
          }
          onSelectNode={e =>
            this._handleSelectNode(e.detail.key, e.detail.selected)
          }
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

  private autoSelectAllHandler(node, newValue): void {
    node.selected = newValue;
    if (node.subnodes.length) {
      node.subnodes.map(subnode =>
        this.autoSelectAllHandler(subnode, newValue)
      );
    }
  }
}
