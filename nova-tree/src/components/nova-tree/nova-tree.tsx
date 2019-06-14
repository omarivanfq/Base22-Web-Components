import { Component, Prop, Element, h } from "@stencil/core";
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



  componentDidLoad() {
      let ul = this.element.shadowRoot.children.item(1);
      this.autoExpandParent ? this.handleAutoExpand(ul) : undefined;
    }
    handleToggle = e => {
      e.target.classList.toggle("caret-down");
      e.target.nextElementSibling.classList.toggle("active");
    };

  handleExpandLi = e => {
   e.children[0].classList.toggle("caret-down");
   e.children[0].nextElementSibling.classList.toggle("active");
 };

 handleAutoExpand = e => {
   for (var i = 0; i < e.children.length; i++) {
     if (e.children[i].children.length) {
       this.handleExpandLi(e.children[i]);
       this.handleAutoExpand(e.children[i].children[1]);
     }
   }
 };


//componentDidLoad(){
//  this.handleAutoExpand();
//}
//  handleAutoExpand = e =>{
//    let ul = document.getElementbyId("myUL");

    //console.log(this.element.shadowRoot.children.item(1));
    //console.log(ul);
        //e.target.classList.toggle("caret-down");
    //e.target.nextElementSibling.classList.toggle("active");
  //};


  @Prop() autoExpandParent: boolean = true ;

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
