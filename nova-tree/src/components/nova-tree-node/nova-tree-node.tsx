import { Component, Element ,  h, State, Prop } from "@stencil/core";

@Component({
  tag: "nova-tree-node",
  styleUrl: "nova-tree-node.scss",
  shadow: true
})
export class MyLeaf {
  @Prop() text: string;
  @Prop() checked: boolean = false;
  @Element() el:HTMLElement;


  @State() opened: boolean = true;




  render() {
    return (
      <li>
        <span class="caret" onClick={() =>
          //aqui va la funcion que editamos para esconder los hijos
          // tanto para expander y ocultar

          {
            let children = this.el.shadowRoot.querySelector(".hydrated");
            for (child in children) {
              child.classList.toggle("hide");
              }
            //window.alert(hydrated)


        }
                                //this.el.


          //class="float hide noselect"

          //window.alert("Hola")

         } />

        <label class="container">
          <input type="checkbox" checked={this.checked} />
          <span class="tree-checkmark" />
        </label>

        <span class="text">{this.text}</span>
      </li>
    );
  }
}
