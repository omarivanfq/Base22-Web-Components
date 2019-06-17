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
    render() {
        return (
            <div class="wrapper" style={this.styles}>
                <label class="container">
                    <input 
                        type="checkbox" 
                        {...{checked: this.checked, disabled: this.disabled}} 
                        onClick={ () => this.clicked.emit() }/>
                    <span class="checkmark"></span>
                 </label> 
            </div>
        );
    }
}