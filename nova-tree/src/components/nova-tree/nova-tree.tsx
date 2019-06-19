import { Component, Prop, Element, Event, EventEmitter, h } from "@stencil/core";
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
     e.target.nextElementSibling.classList.toggle("active");
   };
   /*handleClick(){
     console.log("itworked");
   }*/

 @Prop() checked:boolean;
 @Prop() disabled:boolean;
 @Prop() styles:any = {};
 @Event() clicked:EventEmitter;
 @Prop() handleClick:Function = () => {console.log("itworked");};
 @Prop() autoExpandParent: boolean = true ;
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
      <div class="wrapper" style={this.styles}>
      <span class="caretsecret"></span>
          <label class={ "container " + (this.disabled? "disabled" : "")}>
          <span class = "textcontainer">TEST</span>
              <input
                  type="checkbox"
                  {...{checked: this.checked, disabled: this.disabled}}
                  onClick={() => {
                      this.clicked.emit();
                      this.handleClick();
                      console.log("itworked");

                  }}/>
              <span class="checkmark"></span>
           </label>
      </div>
      </li>
        <li>
        <div class="wrapper" style={this.styles}>
        <span class="caret" onClick={e => this.handleToggle(e)}>
            <label class={ "container " + (this.disabled? "disabled" : "")}>
                <span class = "textcontainer">Beverages</span>
                    <input
                        type="checkbox"
                        {...{checked: this.checked, disabled: this.disabled}}
                        //disabled: true y se disablea
                        onClick={() => {
                            this.clicked.emit();
                            this.handleClick();
                    }}/>
                <span class="checkmark"></span>
             </label>
        </span>
             <ul class="nested">
                 <li>
                     <div class="wrapper" style={this.styles}>
                     <span class="caretsecret">
                         <label class={ "container " + (this.disabled? "disabled" : "")}>
                          <span class = "textcontainer">Water</span>
                                <input
                                     type="checkbox"
                                     {...{checked: this.checked, disabled: this.disabled}}
                                     onClick={() => {
                                         this.clicked.emit();
                                         this.handleClick();
                                 }}/>
                             <span class="checkmark"></span>
                          </label>
                     </span>
                     </div>
                 </li>
                 <li>
                 <div class="wrapper" style={this.styles}>
                 <span class="caretsecret"></span>
                     <label class={ "container " + (this.disabled? "disabled" : "")}>
                      <span class = "textcontainer">Coffee</span>
                             <input
                                 type="checkbox"
                                 {...{checked: this.checked, disabled: this.disabled}}
                                 onClick={() => {
                                     this.clicked.emit();
                                     this.handleClick();
                             }}/>
                         <span class="checkmark"></span>
                      </label>
                 </div>
                 </li>
               <li>
               <div class="wrapper" style={this.styles}>
               <span class="caret" onClick={e => this.handleToggle(e)}>
                   <label class={ "container " + (this.disabled? "disabled" : "")}>
                       <span class = "textcontainer">Tea </span>
                           <input
                               type="checkbox"
                               {...{checked: this.checked, disabled: this.disabled}}
                               onClick={() => {
                                   this.clicked.emit();
                                   this.handleClick();
                           }}/>
                       <span class="checkmark"></span>
                    </label>
               </span>
                 <ul class="nested">
                   <li>
                     <div class="wrapper" style={this.styles}>
                     <span class="caretsecret"></span>
                         <label class={ "container " + (this.disabled? "disabled" : "")}>
                         <span class = "textcontainer">Black Tea</span>
                             <input
                                 type="checkbox"
                                 {...{checked: this.checked, disabled: this.disabled}}
                                 onClick={() => {
                                     this.clicked.emit();
                                     this.handleClick();
                                 }}/>
                             <span class="checkmark"></span>
                          </label>
                     </div>
                   </li>
                   <li>
                   <div class="wrapper" style={this.styles}>
                   <span class="caretsecret"></span>
                       <label class={ "container " + (this.disabled? "disabled" : "")}>
                       <span class = "textcontainer">White Tea</span>
                           <input
                               type="checkbox"
                               {...{checked: this.checked, disabled: this.disabled}}
                               onClick={() => {
                                   this.clicked.emit();
                                   this.handleClick();
                               }}/>
                           <span class="checkmark"></span>
                        </label>
                   </div>
                   </li>
                   <li>
                   <div class="wrapper" style={this.styles}>

                      <span class="caret" onClick={e => this.handleToggle(e)}>
                           <label class={ "container " + (this.disabled? "disabled" : "")}>
                               <span class = "textcontainer">Green Tea</span>
                                      <input
                                           type="checkbox"
                                           {...{checked: this.checked, disabled: this.disabled}}
                                           onClick={() => {
                                               this.clicked.emit();
                                               this.handleClick();
                                       }}/>
                               <span class="checkmark"></span>
                            </label>
                        </span>
                     <ul class="nested">
                       <li>
                       <div class="wrapper" style={this.styles}>
                       <span class="caretsecret"></span>
                           <label class={ "container " + (this.disabled? "disabled" : "")}>
                           <span class = "textcontainer">Sencha</span>
                               <input
                                   type="checkbox"
                                   {...{checked: this.checked, disabled: this.disabled}}
                                   onClick={() => {
                                       this.clicked.emit();
                                       this.handleClick();
                                   }}/>
                               <span class="checkmark"></span>
                            </label>
                       </div>
                       </li>
                       <li>
                       <div class="wrapper" style={this.styles}>
                       <span class="caretsecret"></span>
                           <label class={ "container " + (this.disabled? "disabled" : "")}>
                           <span class = "textcontainer">Gyokuro</span>
                               <input
                                   type="checkbox"
                                   {...{checked: this.checked, disabled: this.disabled}}
                                   onClick={() => {
                                       this.clicked.emit();
                                       this.handleClick();
                                   }}/>
                               <span class="checkmark"></span>
                            </label>
                       </div>
                       </li>
                       <li>
                       <div class="wrapper" style={this.styles}>
                       <span class="caretsecret"></span>
                           <label class={ "container " + (this.disabled? "disabled" : "")}>
                           <span class = "textcontainer">Matcha</span>
                               <input
                                   type="checkbox"
                                   {...{checked: this.checked, disabled: this.disabled}}
                                   onClick={() => {
                                       this.clicked.emit();
                                       this.handleClick();
                                   }}/>
                               <span class="checkmark"></span>
                            </label>
                       </div>
                       </li>
                       <li>
                       <div class="wrapper" style={this.styles}>
                       <span class="caretsecret"></span>
                           <label class={ "container " + (this.disabled? "disabled" : "")}>
                           <span class = "textcontainer">Pi Lo Chun</span>
                               <input
                                   type="checkbox"
                                   {...{checked: this.checked, disabled: this.disabled}}
                                   onClick={() => {
                                       this.clicked.emit();
                                       this.handleClick();
                                   }}/>
                               <span class="checkmark"></span>
                            </label>
                       </div>
                       </li>
                       <li>
                       <div class="wrapper" style={this.styles}>
                       <span class="caretsecret"></span>
                           <label class={ "container " + (this.disabled? "disabled" : "")}>
                           <span class = "textcontainer">TEST</span>
                               <input
                                   type="checkbox"
                                   {...{checked: this.checked, disabled: this.disabled}}
                                   onClick={() => {
                                       this.clicked.emit();
                                       this.handleClick();
                                   }}/>
                               <span class="checkmark"></span>
                            </label>
                       </div>
                       </li>


                     </ul>
                     </div>
                     </li>

                 </ul>
               </div>
               </li>



        </ul>
        </div>
        </li>

        <li>
        <div class="wrapper" style={this.styles}>
        <span class="caretsecret"></span>
            <label class={ "container " + (this.disabled? "disabled" : "")}>
            <span class = "textcontainer">TEST</span>
                <input
                    type="checkbox"
                    {...{checked: this.checked, disabled: this.disabled}}
                    onClick={() => {
                        this.clicked.emit();
                        this.handleClick();
                    }}/>
                <span class="checkmark"></span>
             </label>
        </div>
        </li>

        <li>
        <div class="wrapper" style={this.styles}>

           <span class="caret" onClick={e => this.handleToggle(e)}>
                <label class={ "container " + (this.disabled? "disabled" : "")}>
                    <span class = "textcontainer">Green Tea</span>
                           <input
                                type="checkbox"
                                {...{checked: this.checked, disabled: this.disabled}}
                                onClick={() => {
                                    this.clicked.emit();
                                    this.handleClick();
                            }}/>
                    <span class="checkmark"></span>
                 </label>
             </span>
          <ul class="nested">
            <li>
            <div class="wrapper" style={this.styles}>
            <span class="caretsecret"></span>
                <label class={ "container " + (this.disabled? "disabled" : "")}>
                <span class = "textcontainer">Sencha</span>
                    <input
                        type="checkbox"
                        {...{checked: this.checked, disabled: this.disabled}}
                        onClick={() => {
                            this.clicked.emit();
                            this.handleClick();
                        }}/>
                    <span class="checkmark"></span>
                 </label>
            </div>
            </li>
            <li>
            <div class="wrapper" style={this.styles}>
            <span class="caretsecret"></span>
                <label class={ "container " + (this.disabled? "disabled" : "")}>
                <span class = "textcontainer">Gyokuro</span>
                    <input
                        type="checkbox"
                        {...{checked: this.checked, disabled: this.disabled}}
                        onClick={() => {
                            this.clicked.emit();
                            this.handleClick();
                        }}/>
                    <span class="checkmark"></span>
                 </label>
            </div>
            </li>
            <li>
            <div class="wrapper" style={this.styles}>
            <span class="caretsecret"></span>
                <label class={ "container " + (this.disabled? "disabled" : "")}>
                <span class = "textcontainer">Matcha</span>
                    <input
                        type="checkbox"
                        {...{checked: this.checked, disabled: this.disabled}}
                        onClick={() => {
                            this.clicked.emit();
                            this.handleClick();
                        }}/>
                    <span class="checkmark"></span>
                 </label>
            </div>
            </li>
            <li>
            <div class="wrapper" style={this.styles}>
            <span class="caretsecret"></span>
                <label class={ "container " + (this.disabled? "disabled" : "")}>
                <span class = "textcontainer">Pi Lo Chun</span>
                    <input
                        type="checkbox"
                        {...{checked: this.checked, disabled: this.disabled}}
                        onClick={() => {
                            this.clicked.emit();
                            this.handleClick();
                        }}/>
                    <span class="checkmark"></span>
                 </label>
            </div>
            </li>
          </ul>
          </div>
          </li>
          <li class = "caret" onClick={e => this.handleToggle(e)}>
            <nova-checkbox></nova-checkbox>happy</li>

             <ul class="nested">
               <li class = "caretsecret"><nova-checkbox></nova-checkbox>Water</li>
               <li class = "caret" onClick={e => this.handleToggle(e)}><nova-checkbox></nova-checkbox>Coffee</li>
             </ul>


      </ul>





//no toques aqui abajo
    );
    }
    }
