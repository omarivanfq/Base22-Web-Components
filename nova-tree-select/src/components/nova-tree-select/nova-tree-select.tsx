import { Component, h } from "@stencil/core";

@Component({
  tag: "nova-tree-select",
  styleUrl: "nova-tree-select.scss",
  shadow: true
})
export class NovaTreeSelect {
  render() {
    return (
      <div>
        <span class="nova-select ">
          <span class="nova-select-single nova-select-selection" tabindex="0">
            hola
          </span>
        </span>
      </div>
    );
  }
}
