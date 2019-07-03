import {
  Component,
  State,
  Element,
  Watch,
  h,
  Prop,
  Event,
  EventEmitter
} from "@stencil/core";
import { TreeSelectChip } from "./FunctionalComponents/nova-tree-select-chip";

@Component({
  tag: "nova-tree-select",
  styleUrl: "nova-tree-select.scss",
  shadow: true
})
export class NovaTreeSelect {
  @Element() public el;
  @Prop() public selectedKeys: string[];
  @Prop() public multiple: boolean;
  @Prop() public blockNode: boolean;
  @Prop() public checkable: boolean;
  @Prop() public disabled: boolean = false;
  @Prop() public styles = {};
  @Prop() public dropdownStyle = {};
  @Prop() public placeholder: string = "Select an option";
  @Prop({ mutable: true }) public data? = { items: [] };
  @Prop() public maxTagCount: number = 3;
  @State() public toBeRemoved: string[];

  @State() public maxTagCountToBeRemove: string[];
  private flatItems: any[];
  @State() public open: boolean = false;
  private tree: HTMLNovaTreeElement;
  @Event() public onChange: EventEmitter;
  @Event() public onSelect: EventEmitter;
  private allSelectedKeys: string[] = [];

  @Watch("data")
  public dataChange(_newValue: any, _oldValue: any): void {
    this.flatItems = this._getFlatItems(_newValue.items);
  }

  private _getFlatItems(items) {
    var flatItems = [];
    this._toFlatItemsRec(items, flatItems);
    return flatItems;
  }

  private _toFlatItemsRec(items, array): void {
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

  public componentWillLoad(): void {
    this.selectedKeys = [];
    this.toBeRemoved = [];
    this.flatItems = this._getFlatItems(this.data.items);
  }

  private _removeAllOptions(event): void {
    event.stopPropagation();
    this.selectedKeys = [];
    this._updateAllItems({ selected: false });
  }

  private _removeMultipleOptions(): void {
    if (this.checkable) {
      this.maxTagCountToBeRemove.forEach(key => {
        this._updateItem(key, { checked: false, selected: false });
      });
    } else {
      this.maxTagCountToBeRemove.forEach(key => {
        this._removeOption(key);
      });
    }
    this.maxTagCountToBeRemove = [];
  }

  private _updateAllItems(attr: any) {
    this._updateAllItemsRec(this.data.items, attr);
    this.el.shadowRoot.querySelector("nova-tree").updateData({...this.data});
  }

  private _updateAllItemsRec(items: any[], attr: any) {
    items.forEach(item => {
      var attrKeys = Object.keys(attr);
      attrKeys.forEach(attrKey => {
        item[attrKey] = attr[attrKey];
      });
      this._updateAllItemsRec(item.subnodes, attr);
    });
  }

  private _updateItem(key: string, attr: any) {
    this._updateItemRec(this.data.items, key, attr);
    this.el.shadowRoot.querySelector('nova-tree').updateData({ ...this.data });
    this.onChange.emit(this.data);
  }

  private _updateItemRec(items: any[], key: string, attr: any) {
    items.forEach(item => {
      if (item.nodeKey === key) {
        var attrKeys = Object.keys(attr);
        attrKeys.forEach(attrKey => {
          if (!item.disabled) {
            item[attrKey] = attr[attrKey];
          }
        });
      } else {
        this._updateItemRec(item.subnodes, key, attr);
      }
    });
  }

  private _getOptionsSelected(): any[] {
    if ((this.multiple || this.checkable) && this.selectedKeys.length > 0) {
      let pileCount = 0;
      this.maxTagCountToBeRemove = [];
      const itemsToDisplay = this.selectedKeys.map(key => {
        if (pileCount++ < this.maxTagCount || this.maxTagCount <= 0) {
          var item = this.flatItems.find(item => item.key === key);
          return (
            <TreeSelectChip
              key={item.key}
              toBeRemoved={this.toBeRemoved.indexOf(item.key) !== -1}
              text={item.text}
              removeHandler={() => {
                if (this.checkable) {
                  this._updateItem(key, { checked: false, selected: false });
                } else {
                  this._removeOption(item.key);
                }
              }}
            ></TreeSelectChip>
          );
        } else {
          this.maxTagCountToBeRemove.push(key);
          return undefined;
        }
      });

      const maxTag = (
        <TreeSelectChip
          key={"maxTagCount"}
          toBeRemoved={this.toBeRemoved.indexOf("maxTagCount") !== -1}
          text={(pileCount - this.maxTagCount).toString() + "..."}
          removeHandler={() => this._removeMultipleOptions()}
        ></TreeSelectChip>
      );

      return [
        ...itemsToDisplay,
        pileCount > this.maxTagCount && this.maxTagCount > 0
          ? maxTag
          : undefined
      ];
    } else if ((this.multiple || this.checkable) && this.selectedKeys.length === 0) {
      return <span class="disabled-color">{this.placeholder}</span>;
    } else if (this.selectedKeys.length > 0) {
      return this.flatItems.find(item => item.key === this.selectedKeys[0])
        .text;
    }
    return undefined;
  }

  private _removeOption(key: string): void {
    this.toBeRemoved.push(key);
    this.toBeRemoved = [...this.toBeRemoved];
    setTimeout(() => {
      this.selectedKeys.splice(this.selectedKeys.indexOf(key), 1);
      this.toBeRemoved.splice(this.toBeRemoved.indexOf(key), 1);
      this.selectedKeys = [...this.selectedKeys]; // to re-render
    }, 200);
    this._updateItem(key, { checked: false, selected: false });
  }

  private _addOption(key: string): void {
    if (this.multiple || this.checkable) {
      this.selectedKeys = [...this.selectedKeys, key]; // to re-render
    } else {
      if (this.selectedKeys.length != 0) {
        this._updateItem(this.selectedKeys[0], { selected: false });
      }
      this.selectedKeys = [key];
    }
    this._updateItem(key, { selected: !this.checkable });
  }

  private _handleSelection(key: string, selected: boolean): void {
    if (this.checkable) {
      this.tree.getCheckedKeys().then(keys => (this.selectedKeys = keys));
      this.tree.getAllCheckedKeys().then(keys => { this.allSelectedKeys = [...keys]});
      return;
    } 
    if (selected) {
      this._addOption(key);
    } else {
      this._removeOption(key);
    } 
  }

  public render(): HTMLNovaTreeSelectElement {
    return (
      <div class="container" style={this.styles}>
        <span class={"nova-select " + (this.disabled ? "disabled-select" : "")}>
          <span
            class="nova-select-single nova-select-selection"
            tabindex="0"
            onClick={() => (this.open = !this.open)}
          >
            <span
              class="options-remove-all"
              onClick={event => this._removeAllOptions(event)}
            >
            </span>
            {this._getOptionsSelected()}
          </span>
        </span>
        <div class={"options " + (this.open && !this.disabled ? "" : "closed")}>
          <nova-tree
            ref={(el: HTMLNovaTreeElement) => {
              this.tree = el;
            }}
            data={this.data}
            checkable={this.checkable}
            selectable
            block-node={this.blockNode}
            default-expand-all
            multiple={this.multiple || this.checkable}
            onSelect={e => {
              if (this.checkable) {
                this.onSelect.emit({
                  key: e.detail.key,
                  checked: this.selectedKeys.indexOf(e.detail.key) === -1
                });
                this._updateItem(e.detail.key, {
                  checked: this.allSelectedKeys.indexOf(e.detail.key) === -1,// this.selectedKeys.indexOf(e.detail.key) === -1,
                  selected: false
                });
              } else {
                this._handleSelection(e.detail.key, e.detail.selected);
              }
            }}
            onCheck={e => {
              this._handleSelection(e.detail.key, e.detail.checked);
            }}
            style={this.dropdownStyle}
          ></nova-tree>
        </div>
      </div>
    );
  }
}
