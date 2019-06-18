import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
    tag: 'nova-checkbox',
    styleUrl: 'nova-checkbox.css',
    shadow: true
})

export class NovaCheckbox {
    @Prop() checked:boolean;
    @Prop() disabled:boolean;
    @Prop() styles:any = {};
    @Event() clicked:EventEmitter;
    @Prop() handleClick:Function = () => {};
    render() {
        return (
            <div class="wrapper" style={this.styles}>
                <label class={ "container " + (this.disabled? "disabled" : "")}>
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
        );
    }
}
