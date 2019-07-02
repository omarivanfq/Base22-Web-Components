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
   *  This property allow to clear by setting value to 0
   */
  @Prop() allowClear: boolean = true;

  /**
   *  This property allow half values
   */
  @Prop() allowHalf: boolean = false;

  /**
   *  This property focus the ul when component is mounted
   */
  @Prop() autoFocus: boolean = false;

  /**
   *  This property sets the caracter to display as symbol
   */
  @Prop() character: string = "\u2605";

  /**
   *  This property replaces character for an icon
   */
  @Prop() icon: string = "";

  /**
   *  This property makes the component "read only"
   */
  @Prop() disabled: boolean = false;

  /**
   *  This property sets the number of stars
   */
  @Prop() count: number = 5;

  /**
   *  This property sets the initial value
   */
  @Prop() defaultValue: number = 0;

  @Prop({ mutable: true }) configuration?: any = {
    count: 5,
    allowHalf: true,
    allowClear: true,
    defaultValue: 0,
    autoFocus: true
  };
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
    return this.icon !== "" ? (
      <nova-font-awesome iconName={this.icon} />
    ) : (
      this.character
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
      // this.onChange.emit(this.value);
    }
  }

  handleGenerateStarList(numberOfStars: number) {
    if (this.isComponentReady && this.disabled) return; // Disable Changes

    // Eliminate Reminder if half stars are not allowed
    if (!this.allowHalf) numberOfStars = Math.floor(numberOfStars);

    let starList = [];

    // Fill Star (allowHalf is false)
    let filledStar = i => {
      return (
        <li>
          <span
            class="on"
            onMouseOver={() => this.handleOnHover(i)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i)}
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
          >
            {this.getCharacterOrIcon()}
          </span>
          <span
            class="on right"
            onMouseOver={() => this.handleOnHover(i)}
            onMouseOut={() => this.handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i)}
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
    return (
      <ul
        tabindex="0"
        onKeyDown={e => this.handleOnKeyPressed(e)}
        onBlur={() => this.onBlur.emit()}
        onFocus={() => this.onFocus.emit()}
      >
        {this.starList}
      </ul>
    );
  }
}
