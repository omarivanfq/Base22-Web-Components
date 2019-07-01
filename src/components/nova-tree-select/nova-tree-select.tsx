import { Component, State, Element, Watch, h, Prop } from "@stencil/core";
import { TREE_ITEMS } from "./dummy-data";
import { taggedTemplateExpression } from "@babel/types";

@Component({
  tag: "nova-tree-select",
  styleUrl: "nova-tree-select.scss",
  shadow: true
})
export class NovaTreeSelect {

  @Element() el; 
  @Prop() selectedKeys: string[];
  @Prop() multiple: boolean;
  @Prop() blockNode: boolean;
  @Prop() checkable: boolean;
  @Prop() toBeRemoved: string[];
  @Prop({ mutable: true }) public data?: any = { items: TREE_ITEMS };
  private flatItems:any [];
  @State() open: boolean = false;

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
    this.selectedKeys = []; 
    this.toBeRemoved = [];
    this.flatItems = this._getFlatItems(this.data.items);
  }

  private _removeAllOptions(event) {
    event.stopPropagation();
    this.selectedKeys = []; // to re-render
  }

  private _removeOption(key:string) {
    this.toBeRemoved.push(key);
    this.toBeRemoved = [...this.toBeRemoved];
    setTimeout(() => {
      this.selectedKeys.splice(this.selectedKeys.indexOf(key), 1);
      this.toBeRemoved.splice(this.toBeRemoved.indexOf(key), 1);  
      this.selectedKeys = [...this.selectedKeys]; // to re-render      
    }, 200); 
    this._updateItem(key, { selected: false });
  //  this.data = { ...this.data }; //this._copyObject(this.data);
  //  console.log();
  }

  private _copyObject(obj:any) {
    return JSON.parse(JSON.stringify(obj));
  }

  private _updateItem(key:string, attr:any) {
    this._updateItemRec(this.data.items, key, attr);
    this.el.shadowRoot.querySelector("nova-tree").updateData({ ...this.data })
  }

  private _updateItemRec(items:any[], key:string, attr:any) {
    items.forEach(item => {
      if (item.nodeKey === key) {
        var attrKeys = Object.keys(attr);
        attrKeys.forEach(attrKey => {
          item[attrKey] = attr[attrKey];
        });
      }
      else {
        this._updateItemRec(item.subnodes, key, attr);
      }
    });
  }

  private _addOption(key:string) {
    if (this.multiple) {
      this.selectedKeys.push(key);
      this.selectedKeys = [...this.selectedKeys]; // to re-render  
    }
    else {
      this.selectedKeys = [key];
    }
    this._updateItem(key, { selected: true });
  }

  private _getOptionsSelected() {
    if (this.multiple) {
      return this.flatItems
      .filter(option => this.selectedKeys.indexOf(option.key) !== -1)
      .map(option => 
        <span 
          key={option.key}
          class={"option-selected " + (this.toBeRemoved.indexOf(option.key) !== -1? "removed" : "")} 
          title={option.key}
          onClick={e => e.stopPropagation()}>
          { option.text }
          <span onClick={(e) =>{ 
            e.stopImmediatePropagation();
            this._removeOption(option.key)
          }}> 
            x 
          </span>
        </span>);
    }
    else if (this.selectedKeys.length > 0) {
      return this.flatItems.find(item => item.key === this.selectedKeys[0]).text;
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
          <span 
            class="nova-select-single nova-select-selection" 
            tabindex="0"
            onClick={ () => this.open = !this.open }
            >
            <span 
              class="options-remove-all"
              onClick={event => this._removeAllOptions(event) }>
            </span>
            {this._getOptionsSelected()}
          </span>
        </span>
        <div class={"options " + (this.open? '' : 'closed')}>
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
      </div>
    );
  }
}