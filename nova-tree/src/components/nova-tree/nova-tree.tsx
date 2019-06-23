import {
  Component,
  Prop,
  //Element,
  //Watch,
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
  //@Element() private element: HTMLElement;
  @Prop() public defaultExpandAll: boolean = false;
  @Prop() public autoExpandParent: boolean;
  //@Prop() public autoExpandTopLevel: boolean = true;
  @Prop() public blockNode: boolean = false;
  @Prop() public checkable: boolean = false;
  @Prop() public checkStrictly: boolean;
  //@Prop() public defaultExpandAll: boolean = false;
  @Prop() public checked: boolean;
  @Prop() public key: string;
  @Prop() public disabled: boolean;
  @Prop() public styles: object = {};
  @Event() public clicked: EventEmitter;
  //@Watch("checked") public checkSubnodes(){ this.subnodes.map({subnode => {subnode.checked = this.checked;}});}
  //checkStrictly debe ser false

  //este de abajo es de stencil corregido despues de meterlo dentro del wrapper

  // private handleAutoExpand(e): void {
  //   const uls = e.getElementsByTagName("ul");
  //   for (let i = 0; i < uls.length; i++) {
  //     uls.item(i).classList.add("active");
  //   }
  // }

  //
  // this.subnodes.map(nodo => {
  //   nodo.checked = newValue;
  // });

  public componentWillLoad(): void {
    //const ul = this.element.shadowRoot.children.item(1);
    //this.autoExpandTopLevel ? this.handleAutoExpand(ul) : undefined;
    //this.defaultExpandAll ? this.handleAutoExpand(ul) : undefined;
    //
    if (this.autoExpandParent) {
      //console.log("entro");
      MyComponent.treeData.map(parent => {
        parent.expanded = true;
      });
    }
  }

  private static treeData = [
    {
      text: "happy",
      key: "0-0",
      disableCheckbox: false,
      disabled: false,
      checked: false,
      expanded: false,
      subnodes: [
        {
          text: "Water",
          key: "0-0-0",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Coffee",
          key: "0-0-1",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
          subnodes: [
            {
              text: "Coffee",
              key: "0-0-1-0",
              disableCheckbox: false,
              disabled: false,
              checked: false,
              expanded: false,
              subnodes: []
            },
            {
              text: "Whatever",
              key: "0-0-1-0",
              disableCheckbox: false,
              disabled: false,
              checked: false,
              expanded: false,
              subnodes: []
            }
          ]
        }
      ]
    },
    {
      text: "Beverages",
      key: "0-1",
      disableCheckbox: false,
      disabled: false,
      checked: false,
      expanded: false,
      subnodes: [
        {
          text: "Water",
          key: "0-1-0",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Coffee",
          key: "0-1-1",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
          subnodes: []
        },
        {
          text: "Tea",
          key: "0-1-2",
          disableCheckbox: false,
          disabled: false,
          checked: false,
          expanded: false,
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
          key={this.key}
          checkable={this.checkable}
          checkStrictly={this.checkStrictly}
          disableCheckbox={child.disableCheckbox}
          disabled={child.disabled}
          checked={child.checked}
          expanded={child.expanded}
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

      <ul id="myUL">
        {MyComponent.treeData.map(
          (child): HTMLLIElement => this.handleChild(child)
        )}
      </ul>
    );
  }
}
