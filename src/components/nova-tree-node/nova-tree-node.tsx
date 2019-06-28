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
  @Event() public selectingNode: EventEmitter;

  public checkChangedFromChild: boolean = false;

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
    this.checkNode.emit();
    if (this.checkStrictly) {
      return;
    }
    if (this.checkChangedFromChild) {
      this.checkChangedFromChild = false;
      return;
    }
    this.subnodes.map((nodo: NovaTreeNode): void => {
      nodo.checked = newValue;
    });
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
            <label class="this-label">
              {this._generateCheckbox()}
              {this._generateTextbox()}
            </label>
          </Host>
        );
      } else {
        return (
          <Host>
            {this._generateCaret()}
            <label class="this-label">
              {this._generateCheckbox()}
              {this._generateTextbox()}
            </label>
            {this._generateListOfSubnodes()}
          </Host>
        );
      }
    } else {
      if (this.isLeaf) {
        return (
          <Host>
            <span class="caretsecret" />
            <label class="this-label">{this._generateTextbox()}</label>
          </Host>
        );
      } else {
        return (
          <Host>
            {this._generateCaret()}
            <label class="this-label">{this._generateTextbox()}</label>
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
    if (this.blockNode) {
      if (this.selected && this.selectable) {
        return (
          <span
            class="blockNode selected"
            onClick={(): void => this._toggleSelectedState()}
          >
            {this.text}
          </span>
        );
      } else {
        return (
          <span
            class="blockNode"
            onClick={(): void => this._toggleSelectedState()}
          >
            {this.text}
          </span>
        );
      }
    } else {
      if (this.selected && this.selectable) {
        return (
          <span
            class="selected"
            onClick={(): void => this._toggleSelectedState()}
          >
            {this.text}
          </span>
        );
      } else {
        return (
          <span onClick={(): void => this._toggleSelectedState()}>
            {this.text}
          </span>
        );
      }
    }
  }

  private _toggleSelectedState(): void {
    this.selected = !this.selected;
    this.selectingNode.emit({key: this.nodeKey, selected: this.selected});
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
          text={node.text}
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

  //  this.subnodes.find(node => node.nodeKey === nodeKey).checked = checked;
    this.subnodes.forEach((node): void => {
      if (node.nodeKey === nodeKey) {
        node.checked = checked;
      }
    }); 

    if (!this.checkStrictly) {
      if (checked) {
        this.checked = this.subnodes.every(subnode => subnode.checked);
      } else {
        if (this.checked) this.checkChangedFromChild = true;
        this.checked = false;
      }
    }
  }
}
