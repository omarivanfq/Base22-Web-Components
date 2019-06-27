import { Component, Element, h, Prop } from "@stencil/core";

@Component({
  tag: "nova-tree-select",
  styleUrl: "nova-tree-select.scss",
  shadow: true
})
export class NovaTreeSelect {

  @Element() el;

  private static options = [
    {
      key: "op1",
      text: "Like a Prayer"
    },
    {
      key: "op2",
      text: "Express Yourself"
    },
    {
      key: "op3",
      text: "Love Song"
    },
    {
      key: "op4",
      text: "Till Death Do Us Part"
    },
    {
      key: "op5",
      text: "Promise to Try"
    },
    {
      key: "op6",
      text: "Cherish"
    },
    {
      key: "op7",
      text: "Dear Jessie"
    }
  ]

  @Prop() selected: string[];
  @Prop() toBeRemoved: string[];

  componentWillLoad() {
    this.selected = ["op3", "op6", "op7", "op4"]
    this.toBeRemoved = [];
  }

  private _removeAllOptions() {
    this.selected = []; // to re-render
  }

  private _removeOption(key:string) {
    this.toBeRemoved.push(key);
    this.toBeRemoved = [...this.toBeRemoved];
    setTimeout(() => {
      this.selected.splice(this.selected.indexOf(key), 1);
      this.toBeRemoved.splice(this.toBeRemoved.indexOf(key), 1);  
      this.selected = [...this.selected]; // to re-render      
    }, 400);
  }

  private _getOptions() {
    return NovaTreeSelect.options
    .filter(option => this.selected.indexOf(option.key) !== -1)
    .map(option => 
      <span 
        key={option.key}
        class={"option-selected " + (this.toBeRemoved.indexOf(option.key) !== -1? "remove" : "")} 
        title={option.key}>
        { option.text }
        <span onClick={() => this._removeOption(option.key)}> 
          x 
        </span>
      </span>);
  }

  render() {
    return (
      <div>
        <span class="nova-select">
          <span class="nova-select-single nova-select-selection" tabindex="0">
            <span 
              class="options-remove-all"
              onClick={() => this._removeAllOptions() }></span>
            { this._getOptions() }
          </span>
        </span>
      </div>
    );
  }
}
