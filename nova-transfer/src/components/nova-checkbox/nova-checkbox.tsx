import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'nova-checkbox',
    styleUrl: 'nova-checkbox.css',
    shadow: true
})

export class NovaCheckbox {
    @Prop() checked:boolean;
    @Prop() disabled:boolean;
    @Prop() styles:any = {};
    @Prop() handleClick:Function = () => {};
    render() {
        return (
            <div class="wrapper" style={this.styles}>
                <label class="container">
                    <input 
                        type="checkbox" {...{checked: this.checked, disabled: this.disabled}} 
                        onClick={ e => this.handleClick(e)}/>
                    <span class="checkmark"></span>
                 </label> 
            </div>
        );
    }
}