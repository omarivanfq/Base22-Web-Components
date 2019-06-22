import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
  State,
  Method
} from "@stencil/core";
import { DEFAULT_CONFIGURATION } from "./default-configuration";
import { TransferSearchBox } from "./FunctionalComponents/nova-transfer-search-box";

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

  componentWillLoad() {
    this._init();
  }

  componentDidLoad() {
    this.sourceFooter = this._isThereSourceFooter();
    this.targetFooter = this._isThereTargetFooter();
    this.el.querySelectorAll("*[slot]").forEach(s => (s as any).style.visibility="visible");
  }

  /* 
    HANDLERS
  */
  @Method()
  async handleSelect(item:any) {
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

  private _handleSelectAll(direction: string) {
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
        this.filteredItems = [
          ...this.data.items.filter(i => !this._isItemInTarget(i.key)),
          ...this.filteredItems.filter(i => this._isItemInTarget(i.key))
        ]; //[...this.data.items]; // restore filtered items array
      }
      this.filter.emit({ direction: LEFT, 
        filteredKeys: this.filteredItems
        .filter(item => this.data.targetKeys.indexOf(item.key) === -1)
        .map(item => item.key)});
    }
  };

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
        //  this.filteredItems = [...this.data.items]; // restore filtered items
        this.filteredItems = [
          ...this.data.items.filter(i => this._isItemInTarget(i.key)),
          ...this.filteredItems.filter(i => !this._isItemInTarget(i.key))
        ]; //[...this.data.items]; // restore filtered items array
      }
      this.filter.emit({ direction: RIGHT, 
        filteredKeys: this.filteredItems
        .filter(item => this.data.targetKeys.indexOf(item.key) !== -1)
        .map(item => item.key)});
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
          // props for the checkbox
          var checkboxProps = {
            checked: this.selected.indexOf(item.key) !== -1,
            disabled: item.disabled,
            styles: { marginRight: "5px" }
          };
          // props for the item in the column
          var spanProps = {
            onClick: e => {
              e.preventDefault();
              this._handleSelect(item);
            },
            class:
              "item " +
              (item.disabled ? "disabled" : "") +
              (this.transfered.indexOf(item.key) !== -1 ? " highlight" : "") // animation tha highlights items that were just transfered
          };
          return (
            <li>
              <span {...spanProps}>
                <nova-checkbox {...checkboxProps}></nova-checkbox>
                {this.renderItem(item)}
              </span>
            </li>
          );
        })
    );
  }

  private _getSourceCountSpan() {
    // number of items selected in the source column
    var selectedCount = this._getSourceSelected();
    // number of all the items in the source column
    var total = this.filteredItems.length - this.data.targetKeys.length;
    return (
      <span>
        {selectedCount != 0 ? selectedCount + "/" : ""}
        {total}{" "}
        {total > 1
          ? this.configuration.labels.units
          : this.configuration.labels.unit}
      </span>
    );
  }

  private _getTargetCountSpan() {
    // number of items selected in the target column
    var selectedCount = this._getTargetSelected();
    // number of all the items in the target column
    var total = this.data.targetKeys.length;
    return (
      <span>
        {selectedCount != 0 ? selectedCount + "/" : ""}
        {total}{" "}
        {total > 1
          ? this.configuration.labels.units
          : this.configuration.labels.unit}
      </span>
    );
  }

  private _getSelectAllCheckbox(direction: string) {
    // number of items selected in the indicated column
    var selectedCount =
      direction === LEFT
        ? this._getSourceSelected()
        : this._getTargetSelected();
    // number of non disabled items in the indicated column
    var total = this.filteredItems.filter(
      item =>
        (direction === LEFT &&
          !this._isItemInTarget(item.key) &&
          !item.disabled) ||
        (direction === RIGHT &&
          this._isItemInTarget(item.key) &&
          !item.disabled)
    ).length;
    var props = {
      handleClick: () => this._handleSelectAll(direction),
      checked: selectedCount === total && total > 0,
      disabled: this.disabled
    };
    return <nova-checkbox {...props}></nova-checkbox>;
  }

  private _handleItemsScroll(direction, event) {
    this.scrollColumn.emit({ direction, event });
  }

  /*
  private _getTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Omar Iván</th>
            <th>22</th>
          </tr>
          <tr>
            <th>Oscar Alán</th>
            <th>20</th>
          </tr>
        </tbody>
      </table>
    );
  }
*/
  render() {
    this.sourceFooter = this._isThereSourceFooter();
    this.targetFooter = this._isThereTargetFooter();
    return (
      <div class="wrapper" style={this.wrapperStyle}>
        <div class={"container" + (this.disabled ? " disabled" : "")}>
          <div class="column" style={this.columnStyle}>
            <header class="column-header">
              <span>
                {this.showSelectAll ? this._getSelectAllCheckbox(LEFT) : null}
                {this._getSourceCountSpan()}
              </span>
              <span> {this.configuration.labels.titleSource} </span>
            </header>
            <div
              class={
                "items-container " + (this._sourceIsEmpty() ? "empty" : "")
              }
            >
              {this.showSearch ? (
                <TransferSearchBox
                  placeholder={"search"}
                  handleQuery={this._handleSourceQuery}
                  disabled={this.disabled}
                />
              ) : null}
              <div
                class="items"
                onScroll={event => this._handleItemsScroll(LEFT, event)}
              >
                <slot name="source-column"><ul>{this._getItems(LEFT)}</ul></slot>
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

          <span class="operation-buttons" style={this.operationStyle}>
            <button
              class={this._getSourceSelected() > 0 ? "btn-active" : ""}
              onClick={() => this._moveToTarget()}
            >
              {">"}
              <span> {this.configuration.labels.operationRight}</span>
            </button>
            <button
              class={this._getTargetSelected() > 0 ? "btn-active" : ""}
              onClick={() => this._moveToSource()}
            >
              {"<"}
              <span> {this.configuration.labels.operationLeft}</span>
            </button>
          </span>

          <div class="column" style={this.columnStyle}>
            <header class="column-header">
              <span>
                {this.showSelectAll ? this._getSelectAllCheckbox(RIGHT) : null}
                {this._getTargetCountSpan()}
              </span>
              <span>{this.configuration.labels.titleTarget}</span>
            </header>
            <div
              class={
                "items-container " + (this._targetIsEmpty() ? "empty" : "")
              }
            >
              {this.showSearch ? (
                <TransferSearchBox
                  placeholder={"search"}
                  handleQuery={this._handleTargetQuery}
                  disabled={this.disabled}
                />
              ) : null}
              <div
                class="items"
                onScroll={event => this._handleItemsScroll(RIGHT, event)}
              >
                <slot name="target-column"><ul>{this._getItems(RIGHT) /*this.getTable() */}</ul></slot>
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
      return slotsArr.find(s => s.name === "source-footer").assignedNodes().length > 0;
    }
    return false;  
  }

  private _isThereTargetFooter() {
    if (this.el.shadowRoot.querySelectorAll("slot").length !== 0) {
      var slots = this.el.shadowRoot.querySelectorAll("slot");
      var slotsArr = Array.prototype.slice.call(slots);
      return slotsArr.find(s => s.name === "target-footer").assignedNodes().length > 0
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
    return this.selected.filter(
      key => {
        var item = this.filteredItems.find(item => item.key === key);
        if (!item) {
          return false;
        }
        return !this._isItemInTarget(key) && !item.disabled
      }
    ).length;
  }

  // return the number of items selected from target column
  private _getTargetSelected() {
    return this.selected.filter(
      key => {
        var item = this.filteredItems.find(item => item.key === key);
        if (!item) {
          return false;
        }
        return this._isItemInTarget(key) && !item.disabled
      }
    ).length;
  }

  // transfers the selected items to the target (right)
  private _moveToTarget() {
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
    }
  }

  @Method()
  async moveToT() {
    this._moveToTarget();
  }

  private _moveToSource() {
    if (!this.disabled) {
      console.log("selected", this.selected);
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
      console.log("transfered", this.transfered);
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
