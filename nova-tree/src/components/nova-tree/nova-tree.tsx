import { Component, h } from "@stencil/core";
//import Fragment from "stencil-fragment";

@Component({
  tag: "nova-tree",
  styleUrl: "nova-tree.scss",
  shadow: true
})
export class MyComponent {
  handleToggle = e => {
    e.target.classList.toggle("caret-down");
    e.target.nextElementSibling.classList.toggle("active");
  };

  render() {
    return (
      <ul id="myUL">
        <li>
          <span class="caret" onClick={e => this.handleToggle(e)}>
            Beverages
          </span>
          <ul class="nested">
            <li>Water</li>
            <li>Coffee</li>
            <li>
              <span class="caret" onClick={e => this.handleToggle(e)}>
                Tea
              </span>
              <ul class="nested">
                <li>Black Tea</li>
                <li>White Tea</li>
                <li>
                  <span class="caret" onClick={e => this.handleToggle(e)}>
                  Green Tea</span>
                  <ul class="nested">
                    <li>Sencha</li>
                    <li>Gyokuro</li>
                    <li>Matcha</li>
                    <li>Pi Lo Chun</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}
