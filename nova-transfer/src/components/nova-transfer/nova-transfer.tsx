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
    for (let i = 0; i < 7; i++) {
      this.dataSource.push({
        key: i.toString(),
        title: `item${i + 1}`,
        description: `description of content${i + 1}`/*,
        disabled: i % 3 < 1, */
      });
    }
    this.targetKeys = this.dataSource.filter(item => +item.key % 3 > 1).map(item => item.key);
  }

  moveToTarget() {
    console.log(this.selected);
    var alreadyInTarget = []
    this.selected.forEach((key) => {
      if (this.targetKeys.indexOf(key) === -1) {
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
      if (this.targetKeys.indexOf(key) !== -1) {
        this.targetKeys.splice(this.targetKeys.indexOf(key), 1);
      }
      else {
        alreadyInSource.push(key);
      }
    });
    this.selected = [...alreadyInSource];
    console.log(this.selected);
  }

  handleSelect(key:string) {
    if (this.selected.indexOf(key) != -1) {
      this.selected.splice(this.selected.indexOf(key), 1);
    }
    else {
      this.selected.push(key);
    }
    this.selected = [...this.selected]; // to force re-rendering
  }

  getItems(source:boolean) {
    return this.dataSource.filter(item => 
        source && this.targetKeys.indexOf(item.key) === -1 
        || !source && this.targetKeys.indexOf(item.key) !== -1)
      .map(item =>{
        var props = {
            key: item.key,
            checked: this.selected.indexOf(item.key) !== -1
        }
        return <li><span class="item" 
          onClick= {() => this.handleSelect(item.key)}><input type="checkbox" {...props}/>{item.title}</span></li>;
      })
  }

  getSourceSelected() {
    return this.selected.filter(key => this.targetKeys.indexOf(key) === -1).length;
  }

  getTargetSelected() {
    return this.selected.filter(key => this.targetKeys.indexOf(key) !== -1).length;
  }

  getSourceCount() {
    var selectedCount = this.getSourceSelected();
    var total = this.dataSource.length - this.targetKeys.length;
    return <span>{selectedCount != 0? selectedCount + "/": ""} {total} {total > 0? "items" : "item"}</span>;
  }

  getTargetCount() {
    var selectedCount = this.getTargetSelected();
    var total = this.targetKeys.length;
    return <span>{selectedCount != 0? selectedCount + "/" : ""} {total} {total > 0? "items" : "item"}</span>;
  }

  render() {
    return (
        <div class="container">
          <div class="column column--source">
            <div class="column-header">
              <span class="items-count">
                <input type="checkbox"/>
                {this.getSourceCount()}
              </span>
              <span class="column-title">Source</span>      
            </div>
            <div class="items">
              <ul>
                { this.getItems(true) }
              </ul>
            </div>
          </div>
          <span class="switch">
            <button 
              class={this.getSourceSelected() > 0? "btn-active":""} 
              onClick={() => this.moveToTarget()}>{">"}</button>
            <button 
              class={this.getTargetSelected() > 0? "btn-active":""} 
              onClick={() => this.moveToSource()}>{"<"}</button>
          </span>
          <div class="column column--target">
            <div class="column-header">
              <span class="items-count">
                <input type="checkbox"/>
                {this.getTargetCount()}
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
