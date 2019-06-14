import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'nova-transfer',
  styleUrl: 'nova-transfer.css',
  shadow: true
})
export class NovaTransfer {

  @State() dataSource:any[];
  @State() filteredDataSource:any[];
  @State() targetKeys:string[];
  @State() selected:string[];
  @Prop() showSearch:boolean;

  componentWillLoad() { 
    this.selected = [];
    this.dataSource = [];
    this.targetKeys = [];
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
    console.log(this.dataSource);
    this.filteredDataSource = [...this.dataSource];
    console.log(this.dataSource);
  }

  isItemInTarget(key:string){
    return this.targetKeys.indexOf(key) !== -1;
  }

  moveToTarget() {
    console.log('move to target');
  //  console.log(this.selected);
    var alreadyInTarget = []
    this.selected.forEach((key) => {
      if (!this.isItemInTarget(key)) {
        this.targetKeys.push(key);
      }
      else {
        alreadyInTarget.push(key);
      }
    });
    this.selected = [...alreadyInTarget];
 //   console.log(this.selected);
  }

  moveToSource() {
 //   console.log(this.selected);
    console.log('move to source');
    var alreadyInSource = []
    this.selected.forEach((key) => {
      if (this.isItemInTarget(key)) {
        this.targetKeys.splice(this.targetKeys.indexOf(key), 1);
      }
      else {
        alreadyInSource.push(key);
      }
    });
    this.selected = [...alreadyInSource];
 //   console.log(this.selected);
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
    this.selected = [...this.selected]; // to force re-rendering
  }

  getItems(fromSource:boolean) {
    return this.filteredDataSource.filter(item => 
        fromSource && !this.isItemInTarget(item.key)
        || !fromSource && this.isItemInTarget(item.key))
      .map(item =>{
        var checkboxProps = {
            key: item.key,
            checked: this.selected.indexOf(item.key) !== -1,
            disabled: item.disabled
        }
        var spanProps ={
          onClick: () => this.handleSelect(item),
          class: 'item ' + (item.disabled? 'disabled' : '')
        }
        return(
          <li>
            <span {...spanProps}>
              <input type='checkbox' {...checkboxProps}/>
              {item.title}
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
    return <span>{selectedCount != 0? selectedCount + '/': ''}{total} {total > 0? 'items' : 'item'}</span>;
  }

  getTargetCountSpan() {
    var selectedCount = this.getTargetSelected();
    var total = this.targetKeys.length;
    return <span>{selectedCount != 0? selectedCount + '/' : ''}{total} {total > 0? 'items' : 'item'}</span>;
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
    this.selected = [...this.selected]; // to force re-rendering
  }

  getSelectAllCheckbox(fromSource:boolean) {
    var selectedCount = fromSource? this.getSourceSelected() : this.getTargetSelected();
    var total = fromSource? this.filteredDataSource.filter(item => !item.disabled).length - this.targetKeys.length : this.targetKeys.length;
    var props = {
      onClick: () => this.handleSelectAll(fromSource),
      checked: selectedCount === total && total > 0
    };
    return(
      <input 
        type='checkbox' 
        {...props}/>
    );
  }

  handleSourceQuery = (e) => {
    var PATTERN = e.target.value;
    if (!/^ *$/.test(PATTERN)) {
      this.filteredDataSource = 
        [...this.dataSource.filter(item => { return !this.isItemInTarget(item.key) 
          && item.title.indexOf(PATTERN) !== -1; }),
          ...this.dataSource.filter(item => { return this.isItemInTarget(item.key)})
        ];
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
    }    
    else {
      this.filteredDataSource = [...this.dataSource];
    }
  }

  render() {
    {console.log('rendering again');}
    return (
        <div class='container'>
          <div class='column'>
            <div class='column-header'>
              <span class='items-count'>
                {this.getSelectAllCheckbox(true)}
                {this.getSourceCountSpan()}
              </span>
              <span class='column-title'>Source</span>      
            </div>
            <div class='items-container'>
              <span class="search-container">
                <input 
                  onKeyUp={this.handleSourceQuery} 
                  placeholder='Search here'/>
              </span>
              <div class='items'>
                <ul>
                  { this.getItems(true) }
                </ul>
              </div>
            </div>
          </div>
          <span class='switch'>
            <button 
              class={this.getSourceSelected() > 0? 'btn-active':''} 
              onClick={() => this.moveToTarget()}>{'>'}</button>
            <button 
              class={this.getTargetSelected() > 0? 'btn-active':''} 
              onClick={() => this.moveToSource()}>{'<'}</button>
          </span>
          <div class='column'>
            <div class="column-header">
              <span class="items-count">
                {this.getSelectAllCheckbox(false)}
                {this.getTargetCountSpan()}
              </span>
              <span class="column-title">Target</span>
            </div>
            <div class='items-container'>
              <span class="search-container">
                <input 
                  onKeyUp={this.handleTargetQuery} 
                  placeholder='Search here'/>
              </span>
              <div class="items">
                <ul>
                  { this.getItems(false) }
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
