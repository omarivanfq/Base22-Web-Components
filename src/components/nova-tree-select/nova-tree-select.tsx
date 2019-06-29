import { Component, Element, h, Prop } from "@stencil/core";
import { TREE_ITEMS, OPTIONS } from "./dummy-data";

@Component({
  tag: "nova-tree-select",
  styleUrl: "nova-tree-select.scss",
  shadow: true
})
export class NovaTreeSelect {

  @Element() el; 
  @Prop() selected: string[];
  @Prop() toBeRemoved: string[];

  componentWillLoad() {
    this.selected = []; 
    this.toBeRemoved = [];
  }

  private _removeAllOptions() {
    this.selected = []; // to re-render
  }

  private _removeOption(key:string) {
    this.toBeRemoved.push(key);
    this.toBeRemoved = [...this.toBeRemoved];
    setTimeout(() => {
      this.selected.splice(this.selected.indexOf(key), 1);
      this.toBeRemoved.splice(this.toBeRemoved.indexOf(key), 1);  
      this.selected = [...this.selected]; // to re-render      
    }, 200);
  }

  private _addOption(key:string) {
    this.selected.push(key);
    this.selected = [...this.selected]; // to re-render   
  }

  private _getOptionsSelected() {
    return OPTIONS
    .filter(option => this.selected.indexOf(option.key) !== -1)
    .map(option => 
      <span 
        key={option.key}
        class={"option-selected " + (this.toBeRemoved.indexOf(option.key) !== -1? "removed" : "")} 
        title={option.key}>
        { option.text }
        <span onClick={() => this._removeOption(option.key)}> 
          x 
        </span>
      </span>);
  }

  private _handleSelection(key:string, selected:boolean) {
    if (selected) {
      this._addOption(key);
    }
    else {
      this._removeOption(key)
    }
  }

 /* 
  private _getOptions() {
    return NovaTreeSelect.options.map(option => 
      <span 
        key={option.key} 
        class={"option " + (this.selected.indexOf(option.key) !== -1? "disabled" : "")} 
        onClick={() => this._addOption(option.key)}>
          {option.text}
      </span>
    );
  }
  */

  render() {
    return (
      <div class="container">
        <span class="nova-select">
          <span class="nova-select-single nova-select-selection" tabindex="0">
            <span 
              class="options-remove-all"
              onClick={() => this._removeAllOptions() }></span>
            { this._getOptionsSelected() }
          </span>
        </span>
        <div class="options">
          {/* this._getOptions() */}
          <nova-tree 
            data = {{items: TREE_ITEMS}}
            checkable
            selectable
            block-node
            default-expand-all
            multiple
            onSelect={e => this._handleSelection(e.detail.key, e.detail.selected)}>
            </nova-tree>
        </div>
      </div>
    );
  }
}
