import { Component, State, Element, Watch, h, Prop } from "@stencil/core";
import { TREE_ITEMS } from "./dummy-data";
import { taggedTemplateExpression } from "@babel/types";
import { spawn } from "child_process";

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
  @State() toBeRemoved: string[];

  @Prop() disabled: boolean = false;

  @Prop() styles: any = {};
  @Prop() dropdownStyle: any = {};

  @Prop() placeholder: string = "";

  @Prop({ mutable: true }) public data?: any = { items: TREE_ITEMS };

  @Prop() maxTagCount: number = 3;

  @State() maxTagCountToBeRemove: string[];
  private flatItems: any[];
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
    this.selectedKeys = [];
    this._updateAllItems({ selected: false });
  }

  private _removeMultipleOptions() {
    this.maxTagCountToBeRemove.map(key => {
      this.selectedKeys.splice(this.selectedKeys.indexOf(key), 1);
      this._updateItem(key, { selected: false });
    });
    this.maxTagCountToBeRemove = [];
  }

  private _removeOption(key: string) {
    this.toBeRemoved.push(key);
    this.toBeRemoved = [...this.toBeRemoved];
    setTimeout(() => {
      this.selectedKeys.splice(this.selectedKeys.indexOf(key), 1);
      this.toBeRemoved.splice(this.toBeRemoved.indexOf(key), 1);
      this.selectedKeys = [...this.selectedKeys]; // to re-render
    }, 200);
    this._updateItem(key, { selected: false });
  }

  // private _copyObject(obj: any) {
  //   return JSON.parse(JSON.stringify(obj));
  // }

  private _updateAllItems(attr: any) {
    this._updateAllItemsRec(this.data.items, attr);
    this.el.shadowRoot.querySelector("nova-tree").updateData({ ...this.data });
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
    this.el.shadowRoot.querySelector("nova-tree").updateData({ ...this.data });
  }

  private _updateItemRec(items: any[], key: string, attr: any) {
    items.forEach(item => {
      if (item.nodeKey === key) {
        var attrKeys = Object.keys(attr);
        attrKeys.forEach(attrKey => {
          item[attrKey] = attr[attrKey];
        });
      } else {
        this._updateItemRec(item.subnodes, key, attr);
      }
    });
  }

  private _addOption(key: string) {
    if (this.multiple) {
      this.selectedKeys.push(key);
      this.selectedKeys = [...this.selectedKeys]; // to re-render
    } else {
      this.selectedKeys = [key];
    }
    this._updateItem(key, { selected: true });
  }

  private _getOptionsSelected() {
    if (this.multiple && this.selectedKeys.length > 0) {
      let pileCount = 0;
      this.maxTagCountToBeRemove = [];
      return [
        ...this.flatItems
          .filter(option => this.selectedKeys.indexOf(option.key) !== -1)
          .map(option => {
            if (pileCount++ < this.maxTagCount) {
              return (
                <span
                  key={option.key}
                  class={
                    "option-selected " +
                    (this.toBeRemoved.indexOf(option.key) !== -1
                      ? "removed"
                      : "")
                  }
                  title={option.key}
                  onClick={e => e.stopPropagation()}
                >
                  {option.text}
                  <span
                    onClick={e => {
                      e.stopImmediatePropagation();
                      this._removeOption(option.key);
                    }}
                  >
                    x
                  </span>
                </span>
              );
            } else {
              this.maxTagCountToBeRemove.push(option.key);
            }
          }),

        pileCount > this.maxTagCount ? (
          <span
            key="maxTagCount"
            class={
              "option-selected " +
              (this.toBeRemoved.indexOf("maxTagCount") !== -1 ? "removed" : "")
            }
            title={pileCount.toString()}
            onClick={e => e.stopPropagation()}
          >
            {(pileCount - this.maxTagCount).toString()}...
            <span
              onClick={e => {
                e.stopImmediatePropagation();
                this._removeMultipleOptions();
              }}
            >
              x
            </span>
          </span>
        ) : (
          undefined
        )
      ];
    } else if (this.multiple && this.selectedKeys.length === 0) {
      return <span class="disabled-color">{this.placeholder}</span>;
    } else if (this.selectedKeys.length > 0) {
      return this.flatItems.find(item => item.key === this.selectedKeys[0])
        .text;
    }
    return undefined;
  }

  private _handleSelection(key: string, selected: boolean) {
    if (selected) {
      this._addOption(key);
    } else {
      this._removeOption(key);
    }
  }

  render() {
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
            ></span>
            {this._getOptionsSelected()}
          </span>
        </span>
        <div class={"options " + (this.open && !this.disabled ? "" : "closed")}>
          <nova-tree
            data={this.data}
            checkable={this.checkable}
            selectable
            block-node={this.blockNode}
            default-expand-all
            multiple={this.multiple}
            onSelect={e =>
              this._handleSelection(e.detail.key, e.detail.selected)
            }
            style={this.dropdownStyle}
          ></nova-tree>
        </div>
      </div>
    );
  }
}
