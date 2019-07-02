import { Component, State, Element, Watch, h, Prop } from "@stencil/core";
import { TREE_ITEMS } from "./dummy-data";
import { taggedTemplateExpression } from "@babel/types";
import { spawn } from "child_process";
import { TreeSelectChip } from "./FunctionalComponents/nova-tree-select-chip";

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
    console.log("a.selected", this.selectedKeys);
    console.log("to be removed", this.maxTagCountToBeRemove);

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
          if (!item.disabled) {
            item[attrKey] = attr[attrKey];
          }
        });
      } else {
        this._updateItemRec(item.subnodes, key, attr);
      }
    });
  }

  private _getOptionsSelected() {
    if (this.multiple && this.selectedKeys.length > 0) {
      let pileCount = 0;
      this.maxTagCountToBeRemove = [];
      /*
      var itemsToDisplay = 
        this.flatItems
        .filter(item => this.selectedKeys.indexOf(item.key) !== -1)
        .map(item => {
          if (pileCount++ < this.maxTagCount) {
            return (
              <TreeSelectChip
                key={item.key}
                toBeRemoved={this.toBeRemoved.indexOf(item.key) !== -1}
                text={item.text}
                removeHandler={() => this._removeOption(item.key)}>
              </TreeSelectChip>
            );
          } else {
            this.maxTagCountToBeRemove.push(item.key);
            return undefined;
          }
        });
*/
      var itemsToDisplay = this.selectedKeys.map(key => {
        if (pileCount++ < this.maxTagCount) {
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

      var maxTag = (
        <TreeSelectChip
          key={"maxTagCount"}
          toBeRemoved={this.toBeRemoved.indexOf("maxTagCount") !== -1}
          text={(pileCount - this.maxTagCount).toString() + "..."}
          removeHandler={() => this._removeMultipleOptions()}
        ></TreeSelectChip>
      );

      return [
        ...itemsToDisplay,
        pileCount > this.maxTagCount ? maxTag : undefined
      ];
    } else if (this.multiple && this.selectedKeys.length === 0) {
      return <span class="disabled-color">{this.placeholder}</span>;
    } else if (this.selectedKeys.length > 0) {
      return this.flatItems.find(item => item.key === this.selectedKeys[0])
        .text;
    }
    return undefined;
  }

  private _removeOption(key: string) {
    console.log("removing", key);
    this.toBeRemoved.push(key);
    this.toBeRemoved = [...this.toBeRemoved];
    setTimeout(() => {
      this.selectedKeys.splice(this.selectedKeys.indexOf(key), 1);
      this.toBeRemoved.splice(this.toBeRemoved.indexOf(key), 1);
      this.selectedKeys = [...this.selectedKeys]; // to re-render
    }, 200);
    this._updateItem(key, { checked: false, selected: false });
  }

  private _addOption(key: string) {
    if (this.multiple) {
      this.selectedKeys.push(key);
      this.selectedKeys = [...this.selectedKeys]; // to re-render
    } else {
      if (this.selectedKeys.length != 0) {
        //  this._updateItem(this.selectedKeys[0], { selected: false });
      }
      this.selectedKeys = [key];
    }
    this._updateItem(key, { selected: !this.checkable });
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
            onSelect={e => {
              if (this.checkable) {
                this._updateItem(e.detail.key, {
                  checked: this.selectedKeys.indexOf(e.detail.key) === -1,
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