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
    for (let i = 0; i < 20; i++) {
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
  }

  getItems(source:boolean) {
    return this.dataSource.filter(item => 
        source && this.targetKeys.indexOf(item.key) === -1 
        || !source && this.targetKeys.indexOf(item.key) !== -1)
      .map(item =>{
        var props = {
            key: item.key,
            onClick: ()=>this.handleSelect(item.key),
            checked: this.selected.indexOf(item.key) !== -1
        }
        return <li><span class="item"><input type="checkbox" {...props}/>{item.title}</span></li>;
      })
  }

  render() {
    return (
        <div class="container">
            <div class="column column--source">
              <ul>
                { this.getItems(true) }
              </ul>
            </div>
            <span class="switch">
              <button onClick={() => this.moveToTarget()}>{">"}</button>
              <button onClick={() => this.moveToSource()}>{"<"}</button>
            </span>
            <div class="column column--target">
              <ul>
                { this.getItems(false) }
              </ul>
            </div>
        </div>
    );
  }
}
