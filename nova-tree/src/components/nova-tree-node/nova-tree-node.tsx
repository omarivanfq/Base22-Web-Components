import { Component, Element, Host, h, State, Prop, Watch } from "@stencil/core";

@Component({
  tag: "nova-tree-node",
  styleUrl: "nova-tree-node.scss",
  shadow: false
})
export class NovaTreeNode {
  @Prop() public text!: string;
  @Prop() public checkable: boolean = false;
  @Prop() public disableCheckbox: boolean = false;
  @Prop() public disabled: boolean = false;
  @Prop() public checked: boolean = false;
  @Prop({ mutable: true }) public subnodes: NovaTreeNode[] = [];

  @Element() private el: HTMLElement;

  @State() private isLeaf: boolean = true;

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

  private handleToggle(e): void {
    e.target.classList.toggle("caret-down");
    this.el.lastElementChild.classList.toggle("active");
  }

  private handleChild(child: NovaTreeNode): HTMLLIElement {
    return (
      <li>
        <nova-tree-node
          text={child.text}
          checkable={this.checkable}
          disableCheckbox={child.disableCheckbox}
          disabled={child.disabled}
          checked={child.checked}
          subnodes={child.subnodes}
        ></nova-tree-node>
      </li>
    );
  }

  public render(): HTMLElement {
    if (this.checkable) {
      if (this.isLeaf) {
        return (
          <Host>
            <span class="caretsecret"></span>
            <nova-checkbox />
            <span>{this.text}</span>
          </Host>
        );
      } else {
        return (
          <Host>
            <span
              class="caret caret-down"
              onClick={(e): void => this.handleToggle(e)}
            ></span>
            <nova-checkbox />
            <span>{this.text}</span>
            <ul class="nested active">
              {this.subnodes.map(
                (child: NovaTreeNode): HTMLLIElement => this.handleChild(child)
              )}
            </ul>
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
            <span
              class="caret caret-down"
              onClick={(e: MouseEvent): void => this.handleToggle(e)}
            />
            <span>{this.text}</span>
            <ul class="nested active">
              {this.subnodes.map(
                (child: NovaTreeNode): HTMLLIElement => this.handleChild(child)
              )}
            </ul>
          </Host>
        );
      }
    }
  }
}
