import { Component, Host, Event, EventEmitter, h, Prop } from "@stencil/core";

@Component({
  tag: "nova-checkbox",
  styleUrl: "nova-checkbox.scss",
  shadow: true
})
export class NovaCheckbox {
  @Prop() public checked: boolean;
  @Prop() public disabled: boolean;
  @Prop() public styles: any = {};
  @Prop() public handleClick: Function = (_e): void => {};

  @Event() public clicked: EventEmitter;

  public render(): HTMLNovaCheckboxElement {
    return (
      <Host style={this.styles}>
        <label class={this.disabled ? "disabled" : ""}>
          <input
            type="checkbox"
            {...{ checked: this.checked, disabled: this.disabled }}
            onClick={(e): void => {
              this.checked = !this.checked;
              this.clicked.emit({ checked: this.checked });
              this.handleClick(e);
            }}
          />
          <span class="checkmark"></span>
        </label>
      </Host>
    );
  }
}
