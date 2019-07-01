import { Component, Element, Watch, h, Prop } from "@stencil/core";
import { TREE_ITEMS } from "./dummy-data";

@Component({
  tag: "nova-tree-select",
  styleUrl: "nova-tree-select.scss",
  shadow: true
})
export class NovaTreeSelect {

  @Element() el; 
  @Prop() selected: string[];
  @Prop() multiple: boolean;
  @Prop() blockNode: boolean;
  @Prop() checkable: boolean;
  @Prop() toBeRemoved: string[];
  @Prop({ mutable: true }) public data?: any = { items: TREE_ITEMS };
  private flatItems:any [];

  @Watch("data")
  public dataChange(_newValue: any, _oldValue: any): void {
    this.flatItems = this._getFlatItems(_newValue.items);
  }

  private _getFlatItems(items) {
    var flatItems = [];
    this._toFlatItemsRec(items, flatItems);
    return flatItems;
  }

  private _toFlatItemsRec(items, array) {
    items.forEach(item => {
      array.push({
        key: item.nodeKey,
        text: item.text
      });
      if (item.subnodes.length > 0) {
        this._toFlatItemsRec(item.subnodes, array);
      }
    });
  }

  componentWillLoad() {
    this.selected = []; 
    this.toBeRemoved = [];
    this.flatItems = this._getFlatItems(this.data.items);
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
    if (this.multiple) {
      this.selected.push(key);
      this.selected = [...this.selected]; // to re-render  
    }
    else {
      this.selected = [key];
    }
  }

  private _getOptionsSelected() {
    if (this.multiple) {
      return this.flatItems
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
    else if (this.selected.length > 0) {
      return this.flatItems.find(item => item.key === this.selected[0]).text;
    }
    return null;
  }

  private _handleSelection(key:string, selected:boolean) {
    if (selected) {
      this._addOption(key);
    }
    else {
      this._removeOption(key)
    }
  }

  render() {
    return (
      <div class="container">
        <span class="nova-select">
          <span class="nova-select-single nova-select-selection" tabindex="0">
            <span 
              class="options-remove-all"
              onClick={() => this._removeAllOptions() }></span>
              {this._getOptionsSelected()}
          </span>
        </span>
        <div class="options">
          <nova-tree 
            data={ this.data }
            checkable={this.checkable}
            selectable
            block-node={this.blockNode}
            default-expand-all
            multiple={this.multiple}
            onSelect={e => this._handleSelection(e.detail.key, e.detail.selected)}>
            </nova-tree>
        </div>
        <h1>hola</h1>
      </div>
    );
  }
}