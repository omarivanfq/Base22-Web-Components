import { Component, h } from "@stencil/core";

@Component({
  tag: "nova-tree-node",
  styleUrl: "nova-tree-node.scss",
  shadow: true
})
export class NovaTreeNode {
  render() {
    return (
      <div>
        <span class="nova-select" />
      </div>
    );
  }
}
