import { Component, Event, EventEmitter, Prop, h, State } from '@stencil/core';

const RIGHT:string = 'right';
const LEFT:string = 'left';

@Component({
  tag: 'nova-transfer',
  styleUrl: 'nova-transfer.css',
  shadow: true
})

export class NovaTransfer {

  @Prop() data?: any = { items: [], targetKeys: [] };
  @Prop({ mutable: true }) configuration?: any;

  @State() filteredDataSource:any[] = [];
  @State() selected:string[] = [];
  @Prop() notFoundContent:string = 'The list is empty';

  @Prop() columnStyle:any = {}
  @Prop() wrapperStyle:any = {}
  @Prop() operationStyle:any = {}

  @Prop() showSearch:boolean;
  @Prop() disabled:boolean;
  @Prop() showSelectAll:boolean;

  @Event() transferColumn: EventEmitter;
  @Event() scrolling: EventEmitter;
  @Event() search:EventEmitter;
  @Event() select:EventEmitter;

  @Prop() renderItem:Function;
  
  async componentWillLoad() {
    this._init();
  }

  private _init() {
    this.filteredDataSource = [...this.data.items];
    var DEFAULT_CONFIG = { labels: {titleSource: "_source", titleTarget: "_target", operationLeft: "", operationRight: "", unit: "item", units: "items", notFoundContent: "the list is empty", searchPlaceholder: "search here" }};
    this.configuration.labels = {...DEFAULT_CONFIG.labels, ...this.configuration.labels}
  }

  isItemInTarget(key:string) {
    return this.data.targetKeys.indexOf(key) !== -1;
  }

  moveToTarget() {
    if (!this.disabled) {
      var alreadyInTarget = []
      var moveKeys = [];
      this.selected.forEach((key) => {
        if (!this.isItemInTarget(key)) {
          this.data.targetKeys.push(key);
          moveKeys.push(key);
        }
        else {
          alreadyInTarget.push(key);
        }
      });
      this.selected = [...alreadyInTarget];
      this.transferColumn.emit({targetkeys: this.data.targetKeys, direction: RIGHT, moveKeys });
      
    }
  }

  moveToSource() {
    if (!this.disabled) {
      var alreadyInSource = []
      var moveKeys = [];
      this.selected.forEach((key) => {
        if (this.isItemInTarget(key)) {
          this.data.targetKeys.splice(this.data.targetKeys.indexOf(key), 1);
          moveKeys.push(key);
        }
        else {
          alreadyInSource.push(key);
        }
      });
      this.selected = [...alreadyInSource];

      this.transferColumn.emit({targetkeys: this.data.targetKeys, direction: LEFT, moveKeys });

    }
  }

  handleOnSelectCallback() {
    var sourceSelectedKeys = [];
    var targetSelectedKeys = [];

    this.selected.map(key => {
      if (this.isItemInTarget(key)) {
        targetSelectedKeys.push(key);
      }
      else {
        sourceSelectedKeys.push(key);
      }
    });

   // this.onSelectChangeHandler(sourceSelectedKeys, targetSelectedKeys);
    this.select.emit({sourceSelectedKeys, targetSelectedKeys});
  }

  handleSelect(item:any) {
    if (!item.disabled) {
      if (this.selected.indexOf(item.key) !== -1) {
        this.selected.splice(this.selected.indexOf(item.key), 1);
      }
      else {
        this.selected.push(item.key);
      }
    }
    this.handleOnSelectCallback();
    this.selected = [...this.selected]; // to force re-rendering
  }

  getItems(direction:string) {
    return this.filteredDataSource.filter(item => 
        direction === LEFT && !this.isItemInTarget(item.key)
        || direction === RIGHT && this.isItemInTarget(item.key))
      .map(item =>{
       var checkboxProps = {
        //    key: item.key,
            checked: this.selected.indexOf(item.key) !== -1,
            disabled: item.disabled,
            styles: { marginRight: "5px" }
        }
        var spanProps = {
          onClick: (e) => {
            e.preventDefault();
            this.handleSelect(item)
          },
          class: 'item start ' + (item.disabled? 'disabled' : '')
        }
        return(
          <li>
            <span {...spanProps}>
               <nova-checkbox {...checkboxProps}></nova-checkbox> 
              { this.renderItem(item) }
            </span>
          </li>
        );
      })
  }

  getSourceSelected() {
    return this.selected.filter(key => !this.isItemInTarget(key) 
      && !this.filteredDataSource.find(item => item.key === key).disabled).length;
  }

  getTargetSelected() {
    return this.selected.filter(key => this.isItemInTarget(key)).length;
  }

  getSourceCountSpan() {
    var selectedCount = this.getSourceSelected();
    var total = this.filteredDataSource.length - this.data.targetKeys.length;
    return (
      <span>
        { selectedCount != 0? selectedCount + '/': '' }
        { total } { total > 1? this.configuration.labels.unit : this.configuration.labels.units }
      </span>
    );
  }
  
  getTargetCountSpan() {
    var selectedCount = this.getTargetSelected();
    var total = this.data.targetKeys.length;
    return (
      <span>
        { selectedCount != 0? selectedCount + '/' : '' }
        { total } { total > 1? this.configuration.labels.unit : this.configuration.labels.units }
      </span>
    );
  }

  handleSelectAll(direction:string) {
    console.log("handleSelectAll");
    var selectedCount = direction === LEFT? this.getSourceSelected() : this.getTargetSelected();
    var itemsFromColumn = this.filteredDataSource
      .filter(item => direction === LEFT && !this.isItemInTarget(item.key) && !item.disabled
        || direction === RIGHT && this.isItemInTarget(item.key) && !item.disabled);
    var total = itemsFromColumn.length;

    if (selectedCount < total) {
      itemsFromColumn.map(item => {
        if (this.selected.indexOf(item.key) === -1) {
          this.selected.push(item.key);
        }
      });
    }
    else {
      itemsFromColumn.map(item => {
        if (this.selected.indexOf(item.key) !== -1) {
          this.selected.splice(this.selected.indexOf(item.key), 1);
        }
      });
    }
    this.handleOnSelectCallback();
    this.selected = [...this.selected]; // to force re-rendering
  }

  getSelectAllCheckbox(direction:string) {
    var selectedCount = direction === LEFT? this.getSourceSelected() : this.getTargetSelected();
    var total = this.filteredDataSource
      .filter(item => direction === LEFT && !this.isItemInTarget(item.key) && !item.disabled
        || direction === RIGHT && this.isItemInTarget(item.key) && !item.disabled).length;
    var props = {
      handleClick: () => this.handleSelectAll(direction),
      checked: selectedCount === total && total > 0
    };
    return(
       <nova-checkbox {...props}></nova-checkbox>
    );
  }

  handleSourceQuery = (event) => {
    var PATTERN = event.target.value;
    if (!/^ *$/.test(PATTERN)) {
      this.filteredDataSource = 
        [...this.data.items.filter(item => { return !this.isItemInTarget(item.key) 
          && item.title.indexOf(PATTERN) !== -1; }),
          ...this.data.items.filter(item => { return this.isItemInTarget(item.key)})
        ];
        this.search.emit({direction: LEFT, value: PATTERN});
    }    
    else {
      this.filteredDataSource = [...this.data.items];
    }
  }

  handleTargetQuery = (e) => {
    var PATTERN = e.target.value;
    if (!/^ *$/.test(PATTERN)) {
      this.filteredDataSource = 
        [...this.data.items.filter(item => { return this.isItemInTarget(item.key) 
          && item.title.indexOf(PATTERN) !== -1; }),
          ...this.data.items.filter(item => { return !this.isItemInTarget(item.key)})
        ];
        this.search.emit({direction: LEFT, value: PATTERN});
    }    
    else {
      this.filteredDataSource = [...this.data.items];
    }
  }

  handleItemsScroll(direction, event) {
    this.scrolling.emit({direction, event});
  }

  getSourceSearchBox() {
    return (
      <span class="search-container">
        <input 
          onKeyUp={ this.handleSourceQuery } 
          placeholder={ this.configuration.labels.searchPlaceholder}/>
      </span>
    );
  }

  getTargetSearchBox() {
    return(
      <span class="search-container">
        <input
          onKeyUp={ this.handleTargetQuery }
          placeholder={ this.configuration.labels.searchPlaceholder }/>
      </span>
    );
  }

  getTable() {
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

  render() {
    return (
      <div class="wrapper" style={ this.wrapperStyle }>
        <div class={"container" + (this.disabled? " disabled" : "")}>
          <div class="column" style={ this.columnStyle }>
            <header class="column-header">
              <span>
                { this.showSelectAll? this.getSelectAllCheckbox(LEFT) : null }
                { this.getSourceCountSpan() }
              </span>
              <span> { this.configuration.labels.titleSource } </span>      
            </header>
            <div class="items-container">
              { this.showSearch? this.getSourceSearchBox() : null }
              <div class="items" onScroll={ event => this.handleItemsScroll(LEFT, event) }>
                <ul>
                  { this.getItems(LEFT) }
                </ul>
              </div>
            </div>
          </div>
          <span class="operation-buttons" style={this.operationStyle}>
            <button 
              class={ this.getSourceSelected() > 0 ? "btn-active" : "" } 
              onClick={ () => this.moveToTarget() }>{ ">" } <span>{this.configuration.labels.operationLeft}</span></button>
            <button 
              class={ this.getTargetSelected() > 0 ? "btn-active" : "" } 
              onClick={ () => this.moveToSource() }>{ "<" } <span>{this.configuration.labels.operationRight}</span></button>
          </span>
          <div class="column" style={this.columnStyle}>
            <header class="column-header">
              <span>
                { this.showSelectAll? this.getSelectAllCheckbox(RIGHT) : null }
                { this.getTargetCountSpan() }
              </span>
              <span>{ this.configuration.labels.titleTarget }</span>
            </header>
            <div class="items-container">
              { this.showSearch? this.getTargetSearchBox() : null }
              <div class="items" onScroll={ event => this.handleItemsScroll(RIGHT, event) }>
                <ul>
                  <slot>
                  { this.getItems(RIGHT) /*this.getTable() */}
                  </slot>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
