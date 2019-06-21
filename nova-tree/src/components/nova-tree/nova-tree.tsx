import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  h
} from "@stencil/core";
//import Fragment from "stencil-fragment";
// State, <- ete metelo con los demas
//method para las cosas que se pueden llamar desde auera porque son publicas
//los que ienen  --- en el default vana ser states
//if rprop is mutable utable: true inside {}
@Component({
  tag: "nova-tree",
  styleUrl: "nova-tree.scss",
  shadow: true
})
export class MyComponent {
  @Element() private element: HTMLElement;

  //este de abajo es de stencil corregido despues de meterlo dentro del wrapper
  componentDidLoad() {
    let ul = this.element.shadowRoot.children.item(1);
    this.autoExpandParent ? this.handleAutoExpand(ul) : undefined;
  }
  handleAutoExpand = e => {
    let uls = e.getElementsByTagName("ul");
    for (var i = 0; i < uls.length; i++) {
      uls.item(i).classList.add("active");
    }
  };
  handleToggle = e => {
    e.target.classList.toggle("caret-down");
    //e.target.nextElementSibling.classList.toggle("active");
    //e.target.children[1].classList.toggle("active");
    //es primero el 0 checbkos y despues el 1 porque ya es el ul
    //tiene que ser un child element de li
    e.target.parentNode.lastChild.classList.toggle("active");

    //console.log(e.target.parentNode);
    //console.log("el de abajo es el que buscas");
    //console.log(e.target.parentNode.lastChild.classList);
  };
  /*handleClick(){
     console.log("itworked");
   }*/

  @Prop() checked: boolean;
  @Prop() disabled: boolean;
  @Prop() styles: any = {};
  @Event() clicked: EventEmitter;
  @Prop() handleClick: Function = () => {
    console.log("itworked");
  };
  @Prop() autoExpandParent: boolean = true;
  @Prop() checkStrictly: boolean = true;
  //checkStrictly debe ser false

  render() {
    return (
      //en teoria aqui deberia de alar todo en una sola linea
      //desde el json que nos entreguen con la informacion
      //solo para que lo tomes en cuenta
      //checalo en ratetsx de eddy
      //esto es con la intencino de quemetas el WILL load, arapra que no haga tnto overhead

      <ul id="myUL">
        <li>
          <span class="caret" onClick={e => this.handleToggle(e)}></span>
          <nova-checkbox></nova-checkbox>happy
          <ul class="nested">
            <li class="caretsecret">
              <nova-checkbox></nova-checkbox>Water
            </li>

            <li>
              <span class="caret" onClick={e => this.handleToggle(e)}></span>
              <nova-checkbox></nova-checkbox>Coffee
              <ul class="nested">
                <li class="caretsecret">
                  <nova-checkbox></nova-checkbox>Coffe
                </li>
                <li>
                  <span
                    class="caret"
                    onClick={e => this.handleToggle(e)}
                  ></span>
                  <nova-checkbox></nova-checkbox>Whatever
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li>
          <span class="caret" onClick={e => this.handleToggle(e)}></span>
          <nova-checkbox></nova-checkbox>Beverages
          <ul class="nested">
            <li class="caretsecret">
              <nova-checkbox></nova-checkbox>Water
            </li>

            <li class="caretsecret">
              <nova-checkbox></nova-checkbox>Coffee
            </li>

            <li>
              <span class="caret" onClick={e => this.handleToggle(e)}></span>
              <nova-checkbox></nova-checkbox>Tea
            </li>
          </ul>
        </li>
      </ul>

      //no toques aqui abajo
    );
  }
}
