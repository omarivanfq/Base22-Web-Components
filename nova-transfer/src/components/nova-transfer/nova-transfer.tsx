import { Component, Prop, h, State } from '@stencil/core';

const RIGHT:string = 'right';
const LEFT:string = 'left';

@Component({
  tag: 'nova-transfer',
  styleUrl: 'nova-transfer.css',
  shadow: true
})

export class NovaTransfer {

  @State() dataSource:any[] = [];
  @State() filteredDataSource:any[] = [];
  @State() targetKeys:string[] = [];
  @State() selected:string[] = [];
  @Prop({ mutable: true }) titles:string[] = ['source', 'target'];
  @Prop() operations:string[] = ['',''];
  @Prop() unit:string = 'item';
  @Prop() units:string = 'items';
  @Prop() notFoundContent:string = 'The list is empty';
  @Prop() searchPlaceholder:string = 'Search here';

  
  @Prop() showSearch:boolean;
  @Prop() disabled:boolean;
  @Prop() showSelectAll:boolean;

  @Prop() onChangeHandler:Function;
  @Prop() onScrollHandler:Function;
  @Prop() onSearchHandler:Function;
  @Prop() onSelectChangeHandler:Function;
  @Prop() onRenderItemHandler:Function;

  componentDidLoad() { 
    // dummy data 
    for (let i = 0; i < 10; i++) {
      var data = {
        key: i.toString(),
        title: `item${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1, 
        chosen: Math.random() * 2 > 1
      };
      if (data.chosen && !data.disabled) {
        this.targetKeys.push(data.key);
      }
      this.dataSource.push(data);
    }
//    this.titles = ["my","la"];
    this.filteredDataSource = [...this.dataSource];
  }

  isItemInTarget(key:string) {
    return this.targetKeys.indexOf(key) !== -1;
  }

  moveToTarget() {
    if (!this.disabled) {
      var alreadyInTarget = []
      var moveKeys = [];
      this.selected.forEach((key) => {
        if (!this.isItemInTarget(key)) {
          this.targetKeys.push(key);
          moveKeys.push(key);
        }
        else {
          alreadyInTarget.push(key);
        }
      });
      this.selected = [...alreadyInTarget];
      this.onChangeHandler(
        this.targetKeys,
        RIGHT,
        moveKeys
      );
    }
  }

  moveToSource() {
    if (!this.disabled) {
      var alreadyInSource = []
      var moveKeys = [];
      this.selected.forEach((key) => {
        if (this.isItemInTarget(key)) {
          this.targetKeys.splice(this.targetKeys.indexOf(key), 1);
          moveKeys.push(key);
        }
        else {
          alreadyInSource.push(key);
        }
      });
      this.selected = [...alreadyInSource];
      this.onChangeHandler(
        this.dataSource.
          filter(item => this.targetKeys.indexOf(item.key) === -1)
          .map(item => item.key),
          LEFT,
          moveKeys
      );
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

    this.onSelectChangeHandler(sourceSelectedKeys, targetSelectedKeys);
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
            key: item.key,
            checked: this.selected.indexOf(item.key) !== -1,
            disabled: item.disabled
        }
        var spanProps = {
          onClick: () => this.handleSelect(item),
          class: 'item ' + (item.disabled? 'disabled' : '')
        }
        return(
          <li>
            <span {...spanProps}>
              <input type='checkbox' {...checkboxProps}/>
              { this.onRenderItemHandler(item) }
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
    var total = this.filteredDataSource.length - this.targetKeys.length;
    return <span>{selectedCount != 0? selectedCount + '/': ''}{total} {total > 1? this.units : this.unit}</span>;
  }

  getTargetCountSpan() {
    var selectedCount = this.getTargetSelected();
    var total = this.targetKeys.length;
    return <span>{selectedCount != 0? selectedCount + '/' : ''}{total} {total > 1? this.units : this.unit}</span>;
  }

  handleSelectAll(fromSource:boolean) {
    var selectedCount = fromSource? this.getSourceSelected() : this.getTargetSelected();
    var total = fromSource? this.filteredDataSource.filter(item => !item.disabled).length - this.targetKeys.length : this.targetKeys.length;
    var items = this.filteredDataSource
      .filter(item => fromSource && !this.isItemInTarget(item.key) && !item.disabled
        || !fromSource && this.isItemInTarget(item.key));

    if (selectedCount < total) {
      items.map(item => {
        if (this.selected.indexOf(item.key) === -1) {
          this.selected.push(item.key);
        }
      });
    }
    else {
      items.map(item => {
        if (this.selected.indexOf(item.key) !== -1) {
          this.selected.splice(this.selected.indexOf(item.key), 1);
        }
      });
    }
    this.handleOnSelectCallback();
    this.selected = [...this.selected]; // to force re-rendering
  }

  getSelectAllCheckbox(direction:string) {
    var selectedCount = direction == LEFT? this.getSourceSelected() : this.getTargetSelected();
    var total = direction == LEFT? this.filteredDataSource.filter(item => !item.disabled).length - this.targetKeys.length : this.targetKeys.length;
    var props = {
      onClick: () => this.handleSelectAll(direction == LEFT),
      checked: selectedCount === total && total > 0
    };
    return(
      <input 
        type='checkbox' 
        {...props}/>
    );
  }

  handleSourceQuery = (event) => {
    var PATTERN = event.target.value;
    if (!/^ *$/.test(PATTERN)) {
      this.filteredDataSource = 
        [...this.dataSource.filter(item => { return !this.isItemInTarget(item.key) 
          && item.title.indexOf(PATTERN) !== -1; }),
          ...this.dataSource.filter(item => { return this.isItemInTarget(item.key)})
        ];
        this.onSearchHandler(LEFT, PATTERN);
    }    
    else {
      this.filteredDataSource = [...this.dataSource];
    }
  }

  handleTargetQuery = (e) => {
    var PATTERN = e.target.value;
    if (!/^ *$/.test(PATTERN)) {
      this.filteredDataSource = 
        [...this.dataSource.filter(item => { return this.isItemInTarget(item.key) 
          && item.title.indexOf(PATTERN) !== -1; }),
          ...this.dataSource.filter(item => { return !this.isItemInTarget(item.key)})
        ];
        this.onSearchHandler(RIGHT, PATTERN);
    }    
    else {
      this.filteredDataSource = [...this.dataSource];
    }
  }

  handleItemsScroll(direction, event) {
    this.onScrollHandler(direction, event);
  }

  getSourceSearchBox() {
    return (
      <span class="search-container">
        <input 
          onKeyUp={ this.handleSourceQuery } 
          placeholder='Search here'/>
      </span>
    );
  }

  getTargetSearchBox() {
    return(
      <span class="search-container">
        <input
          onKeyUp={ this.handleTargetQuery }
          placeholder='Search here'/>
      </span>
    );
  }

  render() {
    return (
        <div class={"container" + (this.disabled? " disabled" : "")}>
          <div class="column">
            <div class="column-header">
              <span class="items-count">
                { this.showSelectAll? this.getSelectAllCheckbox(LEFT) : null }
                { this.getSourceCountSpan() }
              </span>
              <span class="column-title">{this.titles[0]}</span>      
            </div>
            <div class="items-container">
              { this.showSearch? this.getSourceSearchBox() : null }
              <div class="items" onScroll={ event => this.handleItemsScroll(LEFT, event) }>
                <ul>
                  { this.getItems(LEFT) }
                </ul>
              </div>
            </div>
          </div>
          <span class="transfer-buttons">
            <button 
              class={ this.getSourceSelected() > 0 ? "btn-active" : "" } 
              onClick={ () => this.moveToTarget() }>{ ">" } <span>{this.operations[0]}</span></button>
            <button 
              class={ this.getTargetSelected() > 0 ? "btn-active" : "" } 
              onClick={ () => this.moveToSource() }>{ "<" } <span>{this.operations[1]}</span></button>
          </span>
          <div class="column">
            <div class="column-header">
              <span class="items-count">
                { this.showSelectAll? this.getSelectAllCheckbox(RIGHT) : null }
                { this.getTargetCountSpan() }
              </span>
              <span class="column-title">{ this.titles[1] }</span>
            </div>
            <div class="items-container">
              { this.showSearch? this.getTargetSearchBox() : null }
              <div class="items" onScroll={ event => this.handleItemsScroll(RIGHT, event) }>
                <ul>
                  { this.getItems(RIGHT) }
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
