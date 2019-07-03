import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
  State,
  Watch,
  Method
} from "@stencil/core";
import { DEFAULT_CONFIGURATION } from "./default-configuration";
import { TransferSearchBox } from "./FunctionalComponents/nova-transfer-search-box";
import { TransferOperationButtons } from "./FunctionalComponents/nova-transfer-operation-buttons";
import { TransferColumnHeader } from "./FunctionalComponents/nova-transfer-column-header";
import { TransferItem } from "./FunctionalComponents/nova-transfer-item";

const RIGHT: string = "right";
const LEFT: string = "left";

@Component({
  tag: "nova-transfer",
  styleUrl: "nova-transfer.scss",
  shadow: true
})
export class NovaTransfer {
  /*
    PROPS
  */
  // common attributes
  @Prop() data?: any = {
    items: [], // items displayed in columns
    targetKeys: [] // keys of the items displayed in the target (right) column
  };
  @Prop({ mutable: true }) configuration?: any = {
    labels: {}
  };
  @Prop() styling?: any = {};
  // Transfer attributes
  /*
    custom CSS style used for rendering the transfer columns
  */
  @Prop() columnStyle: any = {};
  /*
    custom CSS style used for rendering the operations column (left, right buttons)
  */
  @Prop() operationStyle: any = {};
  /*
    custom CSS style used for rendering wrapper element
  */
  @Prop() wrapperStyle: any = {};
  /*
    function to generate the item shown on a column
  */
  @Prop() renderItem: Function;
  /*
    function to determine whether an item should show in search result list
  */
  @Prop() filterOption: Function;
  /*
    if included, a search box is shown on each column
  */
  @Prop() showSearch: boolean;
  /*
    whether disabled transfer
  */
  @Prop() disabled: boolean;
  /*
    show select all checkbox on the header
  */
  @Prop() showSelectAll: boolean;

  /*
    EVENTS
  */
  /*
    event that is emmited when search field are changed
  */
  @Event() search: EventEmitter;
  /*
    event that is emitted when the transfer between columns is complete
  */
  @Event() transferColumn: EventEmitter;
  /* 
    event that is emitted when scroll options list
  */
  @Event() scrollColumn: EventEmitter;
  /*
    event that is emitted when items are selected
  */
  @Event() select: EventEmitter;
  /*
      event that is emitted when items are filtered
    */
  @Event() filter: EventEmitter;
  /*
    STATES
  */
  /*
    items that match the pattern in search box
  */
  @State() filteredItems: any[] = [];
  /*
    items that are currently selected
  */
  @State() selected: string[] = [];
  /*
    items that are currently being transfered from one column to another
  */
  @State() transfered: string[] = [];

  @State() sourceFooter: boolean;

  @State() targetFooter: boolean;

  @Element() el: HTMLElement;

  @Watch("data")
  public dataChange(_newValue: any, _oldValue: any): void {
   this._init();
  }

  componentWillLoad() {
    this._init();
  }

  componentDidLoad() {
    this.sourceFooter = this._isThereSourceFooter();
    this.targetFooter = this._isThereTargetFooter();
    this.el
      .querySelectorAll("*[slot]")
      .forEach(s => ((s as any).style.visibility = "visible"));
  }

  /* 
    HANDLERS
  */
  @Method()
  async handleSelect(key: string) {
    var item = this.data.items.find(item => item.key === key);
    this._handleSelect(item);
  }

  private _handleSelect(item: any) {
    if (!this.disabled && !item.disabled) {
      if (this.selected.indexOf(item.key) !== -1) {
        // the item is already on the selected array
        this.selected.splice(this.selected.indexOf(item.key), 1); // remove the item from the array
      } else {
        this.selected.push(item.key); // add the item to the array
      }
    }
    this._emitSelectEvent();
    this.selected = [...this.selected]; // to force re-rendering
  }

  private _handleSelectAll = (direction: string) => {
    if (!this.disabled) {
      // number of items selected in the column
      var selectedCount =
        direction === LEFT
          ? this._getSourceSelected()
          : this._getTargetSelected();

      // all the items in the column
      var itemsFromColumn = this.filteredItems.filter(
        item =>
          (direction === LEFT &&
            !this._isItemInTarget(item.key) &&
            !item.disabled) ||
          (direction === RIGHT &&
            this._isItemInTarget(item.key) &&
            !item.disabled)
      );

      // number of total items in the column
      var total = itemsFromColumn.length;

      if (selectedCount < total) {
        // there are items yet to be selected
        itemsFromColumn.map(item => {
          if (this.selected.indexOf(item.key) === -1) {
            this.selected.push(item.key);
          }
        });
      } else {
        // all the items are already selected
        itemsFromColumn.map(item => {
          if (this.selected.indexOf(item.key) !== -1) {
            this.selected.splice(this.selected.indexOf(item.key), 1);
          }
        });
      }
      this._emitSelectEvent();
      this.selected = [...this.selected]; // to force re-rendering
    }
  }

  private _handleSourceQuery = event => {
    if (!this.disabled) {
      var PATTERN = event.target.value; // input from user
      if (!/^ *$/.test(PATTERN)) {
        // validating it isnt an empty string
        this.filteredItems = [
          ...this.data.items.filter(item => {
            return (
              !this._isItemInTarget(item.key) &&
              this.filterOption(PATTERN, item)
            );
          }), // all the items from source that match the input from user
          ...this.filteredItems.filter(item => {
            return this._isItemInTarget(item.key);
          }) // all the items from target
        ];
        this.search.emit({ direction: LEFT, value: PATTERN });
      } else {
        this._restoreSourceFilteredItems();
      }
      this.filter.emit({
        direction: LEFT,
        filteredKeys: this.filteredItems
          .filter(item => this.data.targetKeys.indexOf(item.key) === -1)
          .map(item => item.key)
      });
    }
  };

  private _restoreSourceFilteredItems() {
    this.filteredItems = [
      ...this.data.items.filter(i => !this._isItemInTarget(i.key)),
      ...this.filteredItems.filter(i => this._isItemInTarget(i.key))
    ];
  }

  private _restoreTargetFilteredItems() {
    this.filteredItems = [
      ...this.data.items.filter(i => this._isItemInTarget(i.key)),
      ...this.filteredItems.filter(i => !this._isItemInTarget(i.key))
    ];
  }

  private _clearSourceSearchbox() {
    this.el.shadowRoot.querySelectorAll(".search-container")[0].querySelector("input").value="";
  }

  private _clearTargetSearchbox() {
    this.el.shadowRoot.querySelectorAll(".search-container")[1].querySelector("input").value="";
  }

  private _handleTargetQuery = e => {
    if (!this.disabled) {
      var PATTERN = e.target.value;
      if (!/^ *$/.test(PATTERN)) {
        this.filteredItems = [
          ...this.data.items.filter(item => {
            return (
              this._isItemInTarget(item.key) && this.filterOption(PATTERN, item)
            );
          }), // all the items from target that match the input from user
          ...this.filteredItems.filter(item => {
            return !this._isItemInTarget(item.key);
          }) // all the items from source
        ];
        this.search.emit({ direction: RIGHT, value: PATTERN });
      } else {
        this._restoreTargetFilteredItems();
      }
      this.filter.emit({
        direction: RIGHT,
        filteredKeys: this.filteredItems
          .filter(item => this.data.targetKeys.indexOf(item.key) !== -1)
          .map(item => item.key)
      });
    }
  };

  /*
    FUNCTIONS THAT RETURN JSX
  */

  private _getItems(direction: string) {
    return (
      this.filteredItems
        .filter(
          item =>
            (direction === LEFT && !this._isItemInTarget(item.key)) ||
            (direction === RIGHT && this._isItemInTarget(item.key))
        )
        // querying all the items from the indicated direction
        .map(item => {        
          return (
            <TransferItem
              renderItem={() => this.renderItem(item)}
              handleSelect={() => this._handleSelect(item)}
              disabled={item.disabled}
              highlight={this.transfered.indexOf(item.key) !== -1}
              checked={this.selected.indexOf(item.key) !== -1}
              >
            </TransferItem>
          );
        })
    );
  }

  private _handleItemsScroll(direction, event) {
    this.scrollColumn.emit({ direction, event });
  }

  private _getTotalEnabledFromSource() {
    return this.filteredItems.filter(
        item => !this._isItemInTarget(item.key) && !item.disabled
      ).length
  }

  private _getTotalEnabledFromTarget() {
    return this.filteredItems.filter(
        item => this._isItemInTarget(item.key) && !item.disabled
      ).length
  }

  render() {
    this.sourceFooter = this._isThereSourceFooter();
    this.targetFooter = this._isThereTargetFooter();
    return (
      <div class="wrapper" style={this.wrapperStyle}>
        <div class={ "container" + (this.disabled ? " disabled" : "") }>
          <div class="column" style={this.columnStyle}>
            <TransferColumnHeader
              title={ this.configuration.labels.titleSource }
              selectedCount={ this._getSourceSelected() }
         //     total={ this.filteredItems.length - this.data.targetKeys.length }
              total={ this.filteredItems.filter(i => !this._isItemInTarget(i.key)).length }
              totalEnabled={ this._getTotalEnabledFromSource() }
              handleSelectAll={ () => this._handleSelectAll(LEFT) }
              disabled={ this.disabled }
              unit={ this.configuration.labels.unit }
              units={ this.configuration.labels.units }
              showSelectAll={ this.showSelectAll }
              >
            </TransferColumnHeader>
            <div
              class={
                "items-container " + (this._sourceIsEmpty() ? "empty" : "")
              }
            >
              <TransferSearchBox
                placeholder={this.configuration.labels.searchPlaceholder}
                handleQuery={this._handleSourceQuery}
                disabled={this.disabled}
                hidden={!this.showSearch }
              />
              <div
                class="items"
                onScroll={event => this._handleItemsScroll(LEFT, event)}
              >
                <slot name="source-column">
                  <ul>{this._getItems(LEFT)}</ul>
                </slot>
              </div>
              <span class="empty-msg">
                {this.configuration.labels.notFoundContent}
              </span>
            </div>
            <footer
              class={"column-footer " + (this.sourceFooter ? "" : "no-footer")}
            >
              <slot name="source-footer"></slot>
            </footer>
          </div>

          <TransferOperationButtons
            style={ this.operationStyle }
            sourceIsActive={ this._getSourceSelected() > 0 }
            targetIsActive={ this._getTargetSelected() > 0 }
            moveToSource={ this._moveToSource }
            moveToTarget={ this._moveToTarget }
            sourceLabel={ this.configuration.labels.operationLeft }
            targetLabel={ this.configuration.labels.operationRight }
          >
          </TransferOperationButtons>

          <div class="column" style={ this.columnStyle }>
            <TransferColumnHeader
                title={ this.configuration.labels.titleTarget }
                selectedCount={ this._getTargetSelected() }
                totalEnabled={ this._getTotalEnabledFromTarget() }
             //   total={ this.data.targetKeys.length }
                total={ this.filteredItems.filter(i => this._isItemInTarget(i.key)).length }
                handleSelectAll={ () => this._handleSelectAll(RIGHT) }
                disabled={ this.disabled }
                unit={ this.configuration.labels.unit }
                units={ this.configuration.labels.units }
                showSelectAll={ this.showSelectAll }
                >
              </TransferColumnHeader>
            <div
              class={
                "items-container " + (this._targetIsEmpty() ? "empty" : "")
              }
            >
              <TransferSearchBox
                placeholder={this.configuration.labels.searchPlaceholder}
                handleQuery={this._handleTargetQuery}
                disabled={this.disabled}
                hidden={!this.showSearch}
              />
              <div
                class="items"
                onScroll={event => this._handleItemsScroll(RIGHT, event)}
              >
                <slot name="target-column">
                  <ul>{this._getItems(RIGHT)}</ul>
                </slot>
              </div>
              <span class="empty-msg">
                {this.configuration.labels.notFoundContent}
              </span>
            </div>
            <footer
              class={"column-footer " + (this.targetFooter ? "" : "no-footer")}
            >
              <slot name="target-footer"></slot>
            </footer>
          </div>
        </div>
      </div>
    );
  }

  private _isThereSourceFooter() {
    if (this.el.shadowRoot.querySelectorAll("slot").length !== 0) {
      var slots = this.el.shadowRoot.querySelectorAll("slot");
      var slotsArr = Array.prototype.slice.call(slots);
      return (
        slotsArr.find(s => s.name === "source-footer").assignedNodes().length >
        0
      );
    }
    return false;
  }

  private _isThereTargetFooter() {
    if (this.el.shadowRoot.querySelectorAll("slot").length !== 0) {
      var slots = this.el.shadowRoot.querySelectorAll("slot");
      var slotsArr = Array.prototype.slice.call(slots);
      return (
        slotsArr.find(s => s.name === "target-footer").assignedNodes().length >
        0
      );
    }
    return false;
  }

  /*
    Local methods
  */
  private _init() {
    this.filteredItems = [...this.data.items];
    this.configuration.labels = {
      ...DEFAULT_CONFIGURATION.labels,
      ...this.configuration.labels
    };
    this.filterOption = this.filterOption
      ? this.filterOption
      : DEFAULT_CONFIGURATION.functions.filterOption;
    this.renderItem = this.renderItem
      ? this.renderItem
      : DEFAULT_CONFIGURATION.functions.renderItem;
  }

  // return the number of items selected from source column
  private _getSourceSelected() {
    return this.selected.filter(key => {
      var item = this.filteredItems.find(item => item.key === key);
      if (!item) {
        return false;
      }
      return !this._isItemInTarget(key) && !item.disabled;
    }).length;
  }

  // return the number of items selected from target column
  private _getTargetSelected() {
    return this.selected.filter(key => {
      var item = this.filteredItems.find(item => item.key === key);
      if (!item) {
        return false;
      }
      return this._isItemInTarget(key) && !item.disabled;
    }).length;
  }

  // transfers the selected items to the target (right)
  private _moveToTarget = () => {
    if (!this.disabled) {
      var alreadyInTarget = [];
      var moveKeys = []; // items that are transfering
      this.selected.forEach(key => {
        if (!this._isItemInTarget(key)) {
          this.data.targetKeys.push(key);
          moveKeys.push(key);
        } else {
          alreadyInTarget.push(key);
        }
      });
      this.selected = [...alreadyInTarget]; // the ones that were already on the target are now the only selected
      this.transferColumn.emit({
        targetKeys: this.data.targetKeys,
        direction: RIGHT,
        moveKeys
      });
      this.transfered = [...moveKeys];
      this._restoreTargetFilteredItems();
      if (this.showSearch) {
        this._clearTargetSearchbox();
      }
    }
  }

  private _moveToSource = () => {
    if (!this.disabled) {
      var alreadyInSource = [];
      var moveKeys = []; // items that are transfering
      this.selected.forEach(key => {
        if (this._isItemInTarget(key)) {
          this.data.targetKeys.splice(this.data.targetKeys.indexOf(key), 1);
          moveKeys.push(key);
        } else {
          alreadyInSource.push(key);
        }
      });
      this.selected = [...alreadyInSource]; // the ones that were already on the source are now the only selected
      this.transferColumn.emit({
        targetKeys: this.data.targetKeys,
        direction: LEFT,
        moveKeys
      });
      this.transfered = [...moveKeys];
      this._restoreSourceFilteredItems();
      if (this.showSearch) {
        this._clearSourceSearchbox();
      }
    }
  }

  private _isItemInTarget(key: string) {
    return this.data.targetKeys.indexOf(key) !== -1;
  }

  private _emitSelectEvent() {
    var sourceSelectedKeys = [];
    var targetSelectedKeys = [];
    this.selected.map(key => {
      if (this._isItemInTarget(key)) {
        targetSelectedKeys.push(key);
      } else {
        sourceSelectedKeys.push(key);
      }
    });
    this.select.emit({ sourceSelectedKeys, targetSelectedKeys });
  }

  private _sourceIsEmpty() {
    for (var i = 0; i < this.filteredItems.length; i++) {
      var item = this.filteredItems[i];
      if (!this._isItemInTarget(item.key)) {
        return false;
      }
    }
    return true;
  }

  private _targetIsEmpty() {
    for (var i = 0; i < this.filteredItems.length; i++) {
      var item = this.filteredItems[i];
      if (this._isItemInTarget(item.key)) {
        return false;
      }
    }
    return true;
  }
}
