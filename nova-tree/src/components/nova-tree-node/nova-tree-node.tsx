import { Component, h, State, Prop } from "@stencil/core";

@Component({
  tag: "nova-tree-node",
  styleUrl: "nova-tree-node.scss",
  shadow: true
})
export class MyLeaf {
  @Prop() text: string;
  @Prop() checked: boolean = false;

  @State() opened: boolean = true;

  render() {
    return (
      <li>
        <span class="caret" onClick={() => window.alert("Hola")} />

        <label class="container">
          <input type="checkbox" checked={this.checked} />
          <span class="tree-checkmark" />
        </label>

        <span class="text">{this.text}</span>
      </li>
    );
  }
}
