import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'nova-transfer',
  styleUrl: 'nova-transfer.css',
  shadow: true
})
export class MyComponent {

  @State() dataSource:any[];
  @State() targetKeys:string[];
  @State() selected:string[];

  componentWillLoad() { 
    this.selected = [];
    this.dataSource = [];
    // dummy data 
    for (let i = 0; i < 10; i++) {
      this.dataSource.push({
        key: i.toString(),
        title: `item${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1, 
      });
    }
    this.targetKeys = this.dataSource.filter(item => +item.key % 3 > 1 && !item.disabled).map(item => item.key);
  }

  isItemInTarget(key:string){
    return this.targetKeys.indexOf(key) !== -1;
  }

  moveToTarget() {
    console.log(this.selected);
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
    console.log(this.selected);
  }

  moveToSource() {
    console.log(this.selected);
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
    console.log(this.selected);
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
    return this.dataSource.filter(item => 
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
      && !this.dataSource.find(item => item.key === key).disabled).length;
  }

  getTargetSelected() {
    return this.selected.filter(key => this.isItemInTarget(key)).length;
  }

  getSourceCountSpan() {
    var selectedCount = this.getSourceSelected();
    var total = this.dataSource.length - this.targetKeys.length;
    return <span>{selectedCount != 0? selectedCount + '/': ''}{total} {total > 0? 'items' : 'item'}</span>;
  }

  getTargetCountSpan() {
    var selectedCount = this.getTargetSelected();
    var total = this.targetKeys.length;
    return <span>{selectedCount != 0? selectedCount + '/' : ''}{total} {total > 0? 'items' : 'item'}</span>;
  }

  handleSelectAll(fromSource:boolean) {
    var selectedCount = fromSource? this.getSourceSelected() : this.getTargetSelected();
    var total = fromSource? this.dataSource.filter(item => !item.disabled).length - this.targetKeys.length : this.targetKeys.length;
    var items = this.dataSource
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
    var total = fromSource? this.dataSource.filter(item => !item.disabled).length - this.targetKeys.length : this.targetKeys.length;
    var props = {
      onClick: () => this.handleSelectAll(fromSource),
      checked: selectedCount === total
    };
    return(
      <input 
        type='checkbox' 
        {...props}/>
    );
  }

  render() {
    return (
        <div class='container'>
          <div class='column column--source'>
            <div class='column-header'>
              <span class='items-count'>
                {this.getSelectAllCheckbox(true)}
                {this.getSourceCountSpan()}
              </span>
              <span class='column-title'>Source</span>      
            </div>
            <div class='items'>
              <ul>
                { this.getItems(true) }
              </ul>
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
          <div class='column column--target'>
            <div class="column-header">
              <span class="items-count">
                {this.getSelectAllCheckbox(false)}
                {this.getTargetCountSpan()}
              </span>
              <span class="column-title">Target</span>
            </div>
            <div class="items">
              <ul>
                { this.getItems(false) }
              </ul>
            </div>
          </div>
        </div>
    );
  }
}
