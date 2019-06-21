import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";

@Component({
  tag: "nova-checkbox",
  styleUrl: "nova-checkbox.css",
  shadow: true
})
export class NovaCheckbox {
  @Prop({ mutable: true }) checked: boolean;
  @Prop() disabled: boolean;
  @Prop() styles: any = {};
  @Event() clicked: EventEmitter;
  @Prop() handleClick: Function = () => {};
  //  @Prop() autoSelectChildren: boolean = true;

  //handleAutoChildren = c =>{
  //  let uls. = c.getElementsByTagName("ul")<-
  // for (var i=0; i<uls.length;i++){
  // uls.item(i).classList.add("::before")
  //}
  //}

  handleToggle = c => {
    this.checked = !this.checked;
  };

  render() {
    return (
      <div class="wrapper" style={this.styles}>
        <label class={"container " + (this.disabled ? "disabled" : "")}>
          <input
            type="checkbox"
            {...{ checked: this.checked, disabled: this.disabled }}
            onClick={c => this.handleToggle(c)}
            //{
            //      this.clicked.emit();
            //    this.handleClick();
            //}
          />
          <span class="checkmark"></span>
        </label>
      </div>
    );
  }
}
