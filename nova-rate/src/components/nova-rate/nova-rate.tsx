import { Component, Prop, State, EventEmitter, Event, h } from "@stencil/core";

@Component({
  tag: "nova-rate",
  styleUrl: "nova-rate.scss",
  shadow: true
})
export class MyRatingComponent {
  @Prop() allowClear: boolean = false;
  @Prop() allowHalf: boolean = false;
  // autoFocus
  @Prop() character: string = "\u2605";
  @Prop() disabled: boolean = false;

  @Prop() count: number = 5;
  @Prop({ mutable: true }) defaultValue: number = 0;
  @Prop({ mutable: true }) value: number = this.defaultValue;

  @State() mounted: boolean = false;
  @State() starList: Array<object> = [];

  @Event() onRatingUpdated: EventEmitter;

  componentWillLoad() {
    this.createStarList(this.value);
    this.mounted = true;
  }

  setValue(newValue) {
    this.allowClear && this.value === newValue
      ? (this.value = 0)
      : (this.value = newValue);
    this.createStarList(this.value);
    // this.onRatingUpdated.emit({ defaultValue: this.defaultValue });
  }

  createStarList(numberOfStars: number) {
    if (this.mounted && this.disabled) return; // disable changes

    if (!this.allowHalf) numberOfStars = Math.floor(numberOfStars); // Eliminate Reminder

    let starList = [];

    let fill = i => {
      return (
        <li>
          <span
            class="on"
            onMouseOver={() => this.createStarList(i)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i)}
          >
            {this.character}
          </span>
        </li>
      );
    };

    let empty = i => {
      return (
        <li>
          <span
            class="off"
            onMouseOver={() => this.createStarList(i)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i)}
          >
            {this.character}
          </span>
        </li>
      );
    };

    let fillHalf = i => {
      return (
        <li>
          <span class="background">{this.character}</span>
          <span
            class="on left"
            onMouseOver={() => this.createStarList(i - 0.5)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i - 0.5)}
          >
            {this.character}
          </span>
          <span
            class="on right"
            onMouseOver={() => this.createStarList(i)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i)}
          >
            {this.character}
          </span>
        </li>
      );
    };

    let emptyHalf = i => {
      return (
        <li>
          <span class="background">{this.character}</span>
          <span
            class="left"
            onMouseOver={() => this.createStarList(i - 0.5)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i - 0.5)}
          >
            {this.character}
          </span>
          <span
            class="right"
            onMouseOver={() => this.createStarList(i)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i)}
          >
            {this.character}
          </span>
        </li>
      );
    };

    let half = i => {
      return (
        <li>
          <span class="background">{this.character}</span>
          <span
            class="on left"
            onMouseOver={() => this.createStarList(i - 0.5)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i - 0.5)}
          >
            {this.character}
          </span>
          <span
            class="right"
            onMouseOver={() => this.createStarList(i)}
            onMouseOut={() => this.createStarList(this.value)}
            onClick={() => this.setValue(i)}
          >
            {this.character}
          </span>
        </li>
      );
    };

    if (this.allowHalf) {
      for (let i = 1; i <= this.count; i++) {
        console.log("1");
        if (numberOfStars - i + 1 === 0.5) {
          starList.push(half(i));
        } else if (i <= numberOfStars) {
          starList.push(fillHalf(i));
        } else {
          starList.push(emptyHalf(i));
        }
      }
    } else {
      for (let i = 1; i <= this.count; i++) {
        console.log("2");
        if (i <= numberOfStars) {
          starList.push(fill(i));
        } else {
          starList.push(empty(i));
        }
      }
    }

    this.starList = starList;
  }

  render() {
    return (
      <div>
        <ul>{this.starList}</ul>
      </div>
    );
  }
}
