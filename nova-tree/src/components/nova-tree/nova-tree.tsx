import { Component, h } from "@stencil/core";
import Fragment from "stencil-fragment";

@Component({
  tag: "nova-tree",
  styleUrl: "nova-tree.scss",
  shadow: true
})


export class MyComponent {

  function N_name() {
    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
}

  }


  render() {

   //if leaf checked false  => children checked false
   //if leaf checked true => children are individual
   // lo quitamos con un class="float hide noselect" <- hide

   //poniendo <script src="./index.js"></script> como funcion



    return (<ul id="myUL">
      <li><span class="caret">Beverages</span>
        <ul class="nested">
          <li>Water</li>
          <li>Coffee</li>
          <li><span class="caret">Tea</span>
            <ul class="nested">
              <li>Black Tea</li>
              <li>White Tea</li>
              <li><span class="caret">Green Tea</span>
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
    </ul>)
    }
}
