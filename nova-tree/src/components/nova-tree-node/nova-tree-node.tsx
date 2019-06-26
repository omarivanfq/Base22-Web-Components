import {
  Component,
  Element,
  Host,
  h,
  State,
  Prop,
  Watch,
  Event,
  EventEmitter
} from "@stencil/core";

@Component({
  tag: "nova-tree-node",
  styleUrl: "nova-tree-node.scss",
  shadow: false
})
export class NovaTreeNode {
  //Element
  @Element() public el;

  //Props
  @Prop() public text!: string;
  @Prop() public nodeKey: string;
  @Prop() public checkable: boolean = false;
  @Prop() public autoExpandParent: boolean = true;
  @Prop() public defaultExpandAll: boolean = true;
  @Prop() public disableCheckbox: boolean = false;
  @Prop() public checkStrictly: boolean = false;
  @Prop() public disabled: boolean = false;
  @Prop({ mutable: true, reflectToAttr: true }) public checked: boolean = false;
  @Prop({ mutable: true }) public expanded: boolean = false;
  @Prop({ mutable: true }) public subnodes: NovaTreeNode[] = [];

  @State() private isLeaf: boolean = true;

  @Event() public novaTreeNodeCheckedChange: EventEmitter;

  private checkChangedFromChild: boolean = false;

  public componentWillLoad(): void {
    this.isLeaf = !this.subnodes.length;
  }

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

  @Watch("checked")
  public checkRecursivo(newValue: boolean, _oldValue: boolean): void {
    this.novaTreeNodeCheckedChange.emit();

    if (this.checkStrictly) {
      return;
    }

    if (this.checkChangedFromChild) {
      this.checkChangedFromChild = false;
      return;
    }

    console.group("A run");
    this.subnodes.map((nodo: NovaTreeNode): void => {
      console.log(nodo.nodeKey + " " + nodo.checked);
      nodo.checked = newValue;
      console.log(nodo.nodeKey + " " + nodo.checked);
    });
    console.groupEnd();
  }

  //esta a a ser la de expanded
  @Watch("expanded")
  public onExpand(newValue: boolean, _oldValue: boolean): void {
    if (newValue) {
      //console.log("Aqui es para meter funcion on expand");
    } else {
      //console.log("Para meter funncion on collapse");
    }
  }

  public render(): HTMLElement {
    if (this.checkable) {
      if (this.isLeaf) {
        return (
          <Host>
            <span class="caretsecret" />
            {this._generateCheckbox()}
            <span>{this.text}</span>
          </Host>
        );
      } else {
        return (
          <Host>
            {this._generateCaret()}
            {this._generateCheckbox()}
            <span>{this.text}</span>
            {this._generateListOfSubnodes()}
          </Host>
        );
      }
    } else {
      if (this.isLeaf) {
        return (
          <Host>
            <span class="caretsecret" />
            <span>{this.text}</span>
          </Host>
        );
      } else {
        return (
          <Host>
            {this._generateCaret()}
            <span>{this.text}</span>
            {this._generateListOfSubnodes()}
          </Host>
        );
      }
    }
  }

  /**
   * Local methods
   */

  private _generateCaret(): HTMLSpanElement {
    if (this.expanded) {
      return (
        <span
          class="caret caret-down"
          onClick={(): void => this._toggleExpandedState()}
        />
      );
    } else {
      return (
        <span class="caret" onClick={(): void => this._toggleExpandedState()} />
      );
    }
  }

  private _toggleExpandedState(): void {
    this.expanded = !this.expanded;
  }

  private _generateCheckbox(): HTMLNovaCheckboxElement {
    return (
      <nova-checkbox
        disabled={this.disableCheckbox}
        checked={this.checked}
        onNovaCheckboxClicked={(e): void => {
          e.stopPropagation();
          this._updateCheckedState(e);
        }}
      />
    );
  }

  private _updateCheckedState(e): void {
    this.checked = e.target.checked;
  }

  private _generateListOfSubnodes(): HTMLUListElement {
    return (
      <ul class={this.expanded ? "nested active" : "nested"}>
        {this.subnodes.map(
          (node: NovaTreeNode): HTMLLIElement => this._generateSubnode(node)
        )}
      </ul>
    );
  }

  private _generateSubnode(node: NovaTreeNode): HTMLLIElement {
    return (
      <li>
        <nova-tree-node
          text={node.text}
          key={node.nodeKey}
          nodeKey={node.nodeKey}
          checkable={this.checkable}
          disableCheckbox={node.disableCheckbox}
          disabled={node.disabled}
          checked={node.checked}
          checkStrictly={this.checkStrictly}
          expanded={node.expanded}
          subnodes={node.subnodes}
          onNovaTreeNodeCheckedChange={(e): void => {
            e.stopPropagation();
            this._handleSubnodeCheckedChange(e);
          }}
        ></nova-tree-node>
      </li>
    );
  }

  private _handleSubnodeCheckedChange(e): void {
    const nodeKey = e.target.nodeKey;
    const checked = e.target.checked;
    const node = this.subnodes.find((node): boolean => {
      return node.nodeKey === nodeKey;
    });
    node.checked = checked;
    if (this.checkStrictly) {
      return;
    }
    if (checked) {
      this.checked = this.subnodes.every((subnode): boolean => {
        return subnode.checked;
      });
    } else {
      if (this.checked) this.checkChangedFromChild = true;
      this.checked = false;
    }
  }
}
