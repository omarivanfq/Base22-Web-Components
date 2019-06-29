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
import { DEFAULT_CONFIGURATION } from "./default-configuration";

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
  @Prop() public checkable?: boolean = false;
  @Prop() public selectable?: boolean = DEFAULT_CONFIGURATION.selectable;
  @Prop() public blockNode?: boolean = false;

  @Prop() public nodeKey: string;
  @Prop() public selected: boolean;

  @Prop() public autoExpandParent: boolean = true;
  @Prop() public defaultExpandAll: boolean = true;
  @Prop() public disableCheckbox: boolean = false;
  @Prop() public checkStrictly: boolean = false;
  @Prop() public multiple: boolean = false;

  @Prop() public disabled: boolean = false;
  @Prop({ mutable: true }) public checked: boolean = false;
  @Prop({ mutable: true }) public expanded: boolean = false;
  @Prop({ mutable: true }) public subnodes: NovaTreeNode[] = [];
  @State() private isLeaf: boolean;
  @Event() public checkNode: EventEmitter;
  @Event() public selectNode: EventEmitter;

  @Watch("disabled")
  public disabledChange(_newValue: any, _oldValue: any): void {
    if (_newValue) {
      this.disableCheckbox = true;
    }
  }

  public checkChangedFromChild: boolean = false;

  public componentWillLoad(): void {
    this.isLeaf = !this.subnodes.length;
    if (this.disabled) {
      this.disableCheckbox = true;
    }
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
    this.checkNode.emit({key: this.nodeKey, checked: newValue});
    if (!this.checkStrictly) {
      if (this.checkChangedFromChild) {
        this.checkChangedFromChild = false;
      }
      else {
        this.subnodes.map((node: NovaTreeNode): void => {
          // if 'disabled' is true then 'disableCheckbox' should also be true, but for some reason it isn't
          if (!node.disabled && !node.disableCheckbox) { //  if (!node.disabled) {
            node.checked = newValue;
          }
        });
      }
    }
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
    return(
      <Host>
        { this.isLeaf? <span class="caretsecret"/> : this._generateCaret() }
        <label class="this-label">
          { this.checkable? this._generateCheckbox() : null }
          { this._generateTextbox() }
        </label>
        { this.isLeaf? null : this._generateListOfSubnodes() }
      </Host>
    );
  }

  /**
   * Local methods
   */
  private _generateCaret(): HTMLSpanElement {
    return (
      <span
        class={"caret" + (this.expanded? " caret-down" : " ")}
        onClick={(): void => this._toggleExpandedState()}
      />
    );
  }

  private _toggleExpandedState(): void {
    this.expanded = !this.expanded;
  }

  private _generateCheckbox(): HTMLNovaCheckboxElement {
    return (
      <nova-checkbox
        disabled={this.disableCheckbox}
        checked={this.checked}
        onClicked={(e): void => {
          e.stopPropagation();
          this._updateCheckedState(e);
        }}
      />
    );
  }

  private _updateCheckedState(e): void {
    this.checked = e.detail.checked;
  }

  private _generateTextbox(): HTMLSpanElement {
    var classNames = 'textbox ';
    if (this.blockNode) classNames += 'blockNode ';
    if (this.selectable && this.selected) classNames += 'selected ';
    if (this.disabled) classNames += 'disabled';
    return (
      <span
        class={classNames}
        onClick={(): void => this._toggleSelectedState()}
      >
        {this.text}
      </span>
    );
  }

  private _toggleSelectedState(): void {
    if (this.selectable && !this.disabled) {
      this.selected = !this.selected;
      this.selectNode.emit({key: this.nodeKey, selected: this.selected});  
    }
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
          //meter en documentacion que es either qui o en el de treenod ------- ward ------ o pon ndamas el bool arriba
          blockNode={this.blockNode}
          text={node.nodeKey}
          key={node.nodeKey}
          nodeKey={node.nodeKey}
          checkable={this.checkable}
          disableCheckbox={node.disableCheckbox}
          disabled={node.disabled}
          selected={node.selected}
          selectable={this.selectable}
          checked={node.checked}
          checkStrictly={this.checkStrictly}
          multiple={this.multiple}
          expanded={node.expanded}
          subnodes={node.subnodes}
          onCheckNode={(e): void => {
          //  e.stopPropagation();
            this._handleSubnodeOnCheck(e);
          }}
        />
      </li>
    );
  }

  private _handleSubnodeOnCheck(e): void {
    const { nodeKey, checked } = e.target;
    this.subnodes.forEach((node): void => {
      if (node.nodeKey === nodeKey) {
        node.checked = checked;
      }
    }); 
    if (!this.checkStrictly && !this.disableCheckbox) {
      if (checked) {
        this.checked = this.subnodes
        .every(subnode => subnode.checked || subnode.disabled || subnode.disableCheckbox);
      } else {
        if (this.checked) this.checkChangedFromChild = true;
        this.checked = false;
      }
    }
  }
}
