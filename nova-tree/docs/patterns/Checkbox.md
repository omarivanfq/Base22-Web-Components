# Checkbox

:::tip Implementacion de Checkbox

```js

export class NovaCheckbox {
  @Prop({ mutable: true }) public checked: boolean;
  @Prop() public disabled: boolean;
  @Prop() public styles: any = {};
  @Event() public clicked: EventEmitter;
  @Prop() public handleClick: Function = () => {};

handleToggle = () => {
  this.checked = !this.checked;

render() {
  return (
    <div class="wrapper" style={this.styles}>
      <label class={"container " + (this.disabled ? "disabled" : "")}>
        <input
          type="checkbox"
          {...{ checked: this.checked, disabled: this.disabled }}
          //onclick={c => this.handleChildrenExpand(c)}
          onClick={() => this.handleToggle()}
        />
        <span class="checkmark"></span>
      </label>
    </div>
  );
}
}
```

:::
