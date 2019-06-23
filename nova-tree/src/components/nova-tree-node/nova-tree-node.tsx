import { Component, Host, h, State, Prop, Watch } from "@stencil/core";

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
  @Prop({ mutable: true }) public checked: boolean = false;
  @Prop({ mutable: true }) public expanded: boolean = false;
  @Prop({ mutable: true }) public subnodes: NovaTreeNode[] = [];

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

  private handleToggle(): void {
    this.expanded = !this.expanded;
  }

  private handleCheck(e): void {
    this.checked = e.target.checked;
    //entra dos veces
    //funciona para los hijos directos
    this.subnodes.map(nodo => {
      nodo.checked = this.checked;
    });
    console.log("esta entrando este");
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
          expanded={child.expanded}
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
            <nova-checkbox
              checked={this.checked}
              onClick={(e): void => this.handleCheck(e)}
            />
            <span>{this.text}</span>
          </Host>
        );
      } else {
        if (this.expanded) {
          return (
            <Host>
              <span
                class="caret caret-down"
                onClick={(): void => this.handleToggle()}
              ></span>
              <nova-checkbox
                checked={this.checked}
                onClick={(e): void => this.handleCheck(e)}
              />
              <span>{this.text}</span>
              <ul class="nested active">
                {this.subnodes.map(
                  (child: NovaTreeNode): HTMLLIElement =>
                    this.handleChild(child)
                )}
              </ul>
            </Host>
          );
        } else {
          return (
            <Host>
              <span
                class="caret"
                onClick={(): void => this.handleToggle()}
              ></span>
              <nova-checkbox
                checked={this.checked}
                onClick={(e): void => this.handleCheck(e)}
              />
              <span>{this.text}</span>
              <ul class="nested">
                {this.subnodes.map(
                  (child: NovaTreeNode): HTMLLIElement =>
                    this.handleChild(child)
                )}
              </ul>
            </Host>
          );
        }
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
        if (this.expanded) {
          return (
            <Host>
              <span
                class="caret caret-down"
                onClick={(): void => this.handleToggle()}
              />
              <span>{this.text}</span>
              <ul class="nested active">
                {this.subnodes.map(
                  (child: NovaTreeNode): HTMLLIElement =>
                    this.handleChild(child)
                )}
              </ul>
            </Host>
          );
        } else {
          return (
            <Host>
              <span
                class="caret caret-down"
                onClick={(): void => this.handleToggle()}
              />
              <span>{this.text}</span>
              <ul class="nested active">
                {this.subnodes.map(
                  (child: NovaTreeNode): HTMLLIElement =>
                    this.handleChild(child)
                )}
              </ul>
            </Host>
          );
        }
      }
    }
  }
}
