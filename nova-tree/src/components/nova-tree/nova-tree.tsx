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
  public componentDidLoad(): void {
    const ul = this.element.shadowRoot.children.item(1);
    this.autoExpandParent ? this.handleAutoExpand(ul) : undefined;
  }

  private handleAutoExpand(e): void {
    const uls = e.getElementsByTagName("ul");
    for (let i = 0; i < uls.length; i++) {
      uls.item(i).classList.add("active");
    }
  }
  handleToggle = e => {
    e.target.classList.toggle("caret-down");
    //e.target.nextElementSibling.classList.toggle("active");
    //e.target.children[1].classList.toggle("active");
    //es primero el 0 checbkos y despues el 1 porque ya es el ul
    //tiene que ser un child element de li
    console.log(e.target.parentNode.lastChild);
    e.target.parentNode.lastChild.classList.toggle("active");

    //console.log("el de abajo es el que buscas");
    //console.log(e.target.parentNode.lastChild.classList);
  };

  @Prop() public checked: boolean;
  @Prop() public disabled: boolean;
  @Prop() public styles: object = {};
  @Event() public clicked: EventEmitter;
  @Prop() public autoExpandParent: boolean = true;
  @Prop() public checkStrictly: boolean = true;
  //checkStrictly debe ser false

  private treeData = [
    {
      text: "happy",
      checkable: true,
      disableCheckbox: false,
      disabled: false,
      checked: false,
      subnodes: [
        {
          text: "Water",
          checkable: true,
          disableCheckbox: false,
          disabled: false,
          checked: false,
          subnodes: []
        },
        {
          text: "Coffee",
          checkable: true,
          disableCheckbox: false,
          disabled: false,
          checked: false,
          subnodes: [
            {
              text: "Coffee",
              checkable: true,
              disableCheckbox: false,
              disabled: false,
              checked: false,
              subnodes: []
            },
            {
              text: "Whatever",
              checkable: true,
              disableCheckbox: false,
              disabled: false,
              checked: false,
              subnodes: []
            }
          ]
        }
      ]
    },
    {
      text: "Beverages",
      checkable: true,
      disableCheckbox: false,
      disabled: false,
      checked: false,
      subnodes: [
        {
          text: "Water",
          checkable: true,
          disableCheckbox: false,
          disabled: false,
          checked: false,
          subnodes: []
        },
        {
          text: "Coffee",
          checkable: true,
          disableCheckbox: false,
          disabled: false,
          checked: false,
          subnodes: []
        },
        {
          text: "Tea",
          checkable: true,
          disableCheckbox: false,
          disabled: false,
          checked: false,
          subnodes: []
        }
      ]
    }
  ];

  private handleChild(child): HTMLLIElement {
    return (
      <li>
        <nova-tree-node
          text={child.text}
          checkable={child.checkable}
          disableCheckbox={child.disableCheckbox}
          disabled={child.disabled}
          checked={child.checked}
          subnodes={child.subnodes}
        ></nova-tree-node>
      </li>
    );
  }

  public render(): HTMLNovaTreeElement {
    return (
      //en teoria aqui deberia de alar todo en una sola linea
      //desde el json que nos entreguen con la informacion
      //solo para que lo tomes en cuenta
      //checalo en ratetsx de eddy
      //esto es con la intencino de quemetas el WILL load, arapra que no haga tnto overhead
      <ul id="myUL"></ul>
    );
  }
}
