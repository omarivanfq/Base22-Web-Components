import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  h
} from "@stencil/core";

// import { addCustomStyle, populateConfiguration } from "../../../utils/utils";

// import { DEFAULT_CONFIGURATION } from "./default-configuration";

@Component({
  tag: "nova-rate",
  styleUrl: "nova-rate.scss",
  shadow: true
})
export class NovaRate {
  /**
   * Element
   */
  @Element() private el: HTMLElement;
  /**
   * Props
   */

  /**
   *  Allow to clear by setting value to 0
   */
  @Prop() allowClear: boolean = true;

  /**
   *  Allow half values
   */
  @Prop() allowHalf: boolean = false;

  /**
   *  Focus the component when mounted
   */
  @Prop() autoFocus: boolean = false;

  /**
   *  Replace the icon for a caracter, empty will set the icon
   */
  @Prop() character: string = "";

  /**
   *  Sets font awesome icon
   */
  @Prop() icon: string = "star";

  /**
   *  Makes the component "read only"
   */
  @Prop() disabled: boolean = false;

  /**
   *  Sets the number of stars
   */
  @Prop() count: number = 5;

  /**
   *  Sets the initial value
   */
  @Prop() defaultValue: number = 0;

  /**
   *  Sets the size of the rate component
   */
  @Prop() size: number = 20;

  /**
   *  Sets the color
   */
  @Prop() color: string = "#fadb14";

  /**
   *  Sets the initial configuration
   */

  @Prop({ mutable: true }) configuration?: any = {};
  /**
   *  State
   */
  @State() starList: Array<object> = [];
  @State() value: number = this.defaultValue;
  @State() isComponentReady: boolean = false;

  /**
   *  Public API Events
   */
  @Event() onBlur: EventEmitter;
  @Event() onChange: EventEmitter;
  @Event() onFocus: EventEmitter;
  @Event() onHoverChange: EventEmitter;
  @Event() onKeyDown: EventEmitter;

  /**
   *  Public API Methods
   */

  // @Method()
  // async renderComponent() {
  //   await this._init();
  //   this._populateTableVariants();
  //   this.isComponentReady = true;
  // }

  @Method()
  async blurComponent() {
    const ul: any = this.el.shadowRoot.children.item(1);
    ul.blur();
  }

  @Method()
  async focusComponent() {
    const ul: any = this.el.shadowRoot.children.item(1);
    ul.focus();
  }

  /**
   * Lifecycle methods
   */
  componentWillLoad() {
    // this._init();
    this.handleGenerateStarList(this.value);
    this.isComponentReady = true;
  }

  componentDidLoad() {
    if (this.autoFocus) {
      this.focusComponent(); // AutoFocus
    }
  }

  getCharacterOrIcon = () => {
    return this.character !== "" ? (
      this.character
    ) : (
      <nova-font-awesome iconName={this.icon} />
    );
  };

  /**
   * Event handlers
   */
  handleSetValue(newValue) {
    // Checks input is number
    if (!Number(newValue) || newValue === true || newValue === false) {
      return;
    }

    let aux = this.value; // save initial value

    if ((this.allowClear && this.value === newValue) || newValue <= 0) {
      this.value = 0;
    } else if (newValue >= this.count) {
      this.value = this.count;
    } else {
      this.value = newValue;
    }

    // If value changes, generate new StarList and emit onChange
    if (aux !== this.value) {
      this.handleGenerateStarList(this.value);
      this.onChange.emit(this.value);
    }
  }

  handleGenerateStarList(numberOfStars: number) {
    if (this.isComponentReady && this.disabled) return; // Disable Changes

    // Eliminate Reminder if half stars are not allowed
    if (!this.allowHalf) numberOfStars = Math.floor(numberOfStars);

    let starList = [];

    const color = {
      color: `${this.color}`
    };

    // Fill Star (allowHalf is false)
    let filledStar = i => {
      return (
        <li>
          <span
            class="on"
            onMouseOver={() => this.handleOnHover(i)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i)}
            style={color}
          >
            {this.getCharacterOrIcon()}
          </span>
        </li>
      );
    };

    // Empty Star (allowHalf is false)
    let emptyStar = i => {
      return (
        <li>
          <span
            class="off"
            onMouseOver={() => this.handleOnHover(i)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i)}
          >
            {this.getCharacterOrIcon()}
          </span>
        </li>
      );
    };

    // Filled Halves (allowHalf is true)
    let filledHalves = i => {
      return (
        <li>
          <span class="background"> {this.getCharacterOrIcon()}</span>
          <span
            class="on left"
            onMouseOver={() => this.handleOnHover(i - 0.5)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i - 0.5)}
            style={color}
          >
            {this.getCharacterOrIcon()}
          </span>
          <span
            class="on right"
            onMouseOver={() => this.handleOnHover(i)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i)}
            style={color}
          >
            {this.getCharacterOrIcon()}
          </span>
        </li>
      );
    };

    // Empty Halves (allowHalf is true)
    let emptyHalves = i => {
      return (
        <li>
          <span class="background"> {this.getCharacterOrIcon()}</span>
          <span
            class="left"
            onMouseOver={() => this.handleOnHover(i - 0.5)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i - 0.5)}
          >
            {this.getCharacterOrIcon()}
          </span>
          <span
            class="right"
            onMouseOver={() => this.handleOnHover(i)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i)}
          >
            {this.getCharacterOrIcon()}
          </span>
        </li>
      );
    };

    // Left Half is filled and Right Half is empty (allowHalf is true)
    let leftFilledRightEmpty = i => {
      return (
        <li>
          <span class="background">{this.getCharacterOrIcon()}</span>
          <span
            class="on left"
            onMouseOver={() => this.handleOnHover(i - 0.5)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i - 0.5)}
            style={color}
          >
            {this.getCharacterOrIcon()}
          </span>
          <span
            class="right"
            onMouseOver={() => this.handleOnHover(i)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i)}
          >
            {this.getCharacterOrIcon()}
          </span>
        </li>
      );
    };

    if (this.allowHalf)
      for (let i = 1; i <= this.count; i++) {
        if (numberOfStars - i + 1 >= 0.5 && numberOfStars - i + 1 < 1) {
          starList.push(leftFilledRightEmpty(i));
        } else if (i <= numberOfStars) {
          starList.push(filledHalves(i));
        } else {
          starList.push(emptyHalves(i));
        }
      }
    else
      for (let i = 1; i <= this.count; i++) {
        if (i <= numberOfStars) {
          starList.push(filledStar(i));
        } else {
          starList.push(emptyStar(i));
        }
      }

    this.starList = starList;
  }

  handleOnKeyPressed(e) {
    this.onKeyDown.emit(e); // Emit Event
    switch (e.keyCode) {
      case 37:
        this.allowHalf
          ? this.handleSetValue(this.value - 0.5)
          : this.handleSetValue(this.value - 1);
        break;
      case 39:
        this.allowHalf
          ? this.handleSetValue(this.value + 0.5)
          : this.handleSetValue(this.value + 1);
        break;
      default:
        break;
    }
  }

  handleOnHover(value) {
    this.handleGenerateStarList(value);
    this.onHoverChange.emit(value);
  }

  render() {
    const { size } = this;

    const fontSize = {
      fontSize: `${size}px`
    };

    return (
      <ul
        tabindex="0"
        onKeyDown={e => this.handleOnKeyPressed(e)}
        onBlur={() => this.onBlur.emit()}
        onFocus={() => this.onFocus.emit()}
        style={fontSize}
      >
        {this.starList}
      </ul>
    );
  }
}
