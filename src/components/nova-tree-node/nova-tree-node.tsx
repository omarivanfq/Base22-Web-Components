import {
  Component,
  Element,
  Host,
  h,
  Method,
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
  @Prop({ mutable: true }) public selected: boolean;

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
  public checkChangedFromChild: boolean = false;

  @Prop() public refToSubnodes: HTMLNovaTreeNodeElement[] = [];

  /*
  @Watch("disabled")
  public disabledChange(_newValue: any, _oldValue: any): void {
    if (_newValue) {
      this.disableCheckbox = true;
    }
  }
  */

  @Watch("checked")
  public checkedChange(newValue: boolean, _oldValue: boolean): void {
    this.checkNode.emit({ key: this.nodeKey, checked: newValue });

    if (!this.checkStrictly) {
      if (this.checkChangedFromChild) {
        this.checkChangedFromChild = false;
      } else {
        if (!this.checkStrictly) {
          this.subnodes.map((node: NovaTreeNode): void => {
            if (!node.disabled && !node.disableCheckbox) {
              node.checked = this.checked;
            }
          });
          this.refToSubnodes.map((node: HTMLNovaTreeNodeElement): void => {
            if (!node.disabled && !node.disableCheckbox) {
              node.checked = this.checked;
            }
          });
        }
      }
    }
  }

  public componentWillLoad(): void {
    this.isLeaf = !this.subnodes.length;
    /*
    if (this.disabled) {
      this.disableCheckbox = true;
    }
    */
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

  //esta a a ser la de expanded
  @Watch("expanded")
  public onExpand(newValue: boolean, _oldValue: boolean): void {
    if (newValue) {
      //console.log("Aqui es para meter funcion on expand");
    } else {
      //console.log("Para meter funncion on collapse");
    }
  }

  @Method()
  public async getCheckedKeys(): Promise<string[]> {
    if (this.checked) {
      return [this.nodeKey];
    }

    if (this.isLeaf) {
      return [];
    }

    const childKeys = await Promise.all(
      this.refToSubnodes.map(
        async (node: HTMLNovaTreeNodeElement): Promise<string[]> => {
          return await node.getCheckedKeys();
        }
      )
    );
    const result = childKeys.reduce(
      (acc, val): string[] => acc.concat(val),
      []
    );
    return result;
  }

  public render(): HTMLElement {
    return (
      <Host key={this.nodeKey}>
        <div class="flex-container">
          {this._generateCaret()}
          <label
            class={"node-label " + (this.checkable ? "checkable" : "null")}
          >
            {this.checkable ? this._generateCheckbox() : null}
            {this._generateTextbox()}
          </label>
        </div>
        {this.isLeaf ? null : this._generateListOfSubnodes()}
      </Host>
    );
  }

  /**
   * Local methods
   */
  private _generateCaret(): HTMLSpanElement {
    return (
      <span
        class={"car" + (this.expanded ? " caret-down" : "")}
        style={{ visibility: this.isLeaf ? "hidden" : "visible" }}
        onClick={(): void => this._toggleExpandedState()}
      ></span>
    );
  }

  private _toggleExpandedState(): void {
    this.expanded = !this.expanded;
  }

  private _generateCheckbox(): HTMLNovaCheckboxElement {
    return (
      <nova-checkbox
        disabled={this.disableCheckbox || this.disabled}
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
    let classNames = "textbox ";
    if (this.blockNode) classNames += "blockNode ";
    if (this.selectable && this.selected) classNames += "selected ";
    if (this.disabled) classNames += "disabled";
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
      this.selectNode.emit({ key: this.nodeKey, selected: this.selected });
    }
  }

  private _generateListOfSubnodes(): HTMLUListElement {
    return (
      <ul class={this.expanded ? "nested active" : "nested"}>
        {this.subnodes.map(
          (node: NovaTreeNode, index: number): HTMLLIElement =>
            this._generateSubnode(node, index)
        )}
      </ul>
    );
  }

  private _generateSubnode(node: NovaTreeNode, index: number): HTMLLIElement {
    // console.log(node.nodeKey + ": " + node.checked);
    return (
      <li key={node.nodeKey}>
        <nova-tree-node
          //meter en documentacion que es either qui o en el de treenod ------- ward ------ o pon ndamas el bool arriba
          ref={(el: HTMLNovaTreeNodeElement): HTMLNovaTreeNodeElement => {
            return (this.refToSubnodes[index] = el);
          }}
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

  private _handleSubnodeOnCheck(event): void {
    const { nodeKey, checked } = event.target;
    this.subnodes.forEach((node): void => {
      if (node.nodeKey === nodeKey) {
        node.checked = checked;
      }
    });
    if (!this.checkStrictly && !this.disableCheckbox) {
      if (checked) {
        this.checked =
          !this.disabled &&
          !this.disableCheckbox &&
          this.subnodes.every(
            subnode =>
              subnode.checked || subnode.disabled || subnode.disableCheckbox
          );
      } else {
        if (this.checked) this.checkChangedFromChild = true;
        this.checked = false;
      }
    }
  }
}
