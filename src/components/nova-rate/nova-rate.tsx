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
   *  This property allows clearing by setting the value to 0
   */
  @Prop() public allowClear: boolean = true;

  /**
   *  This property allow half values
   */
  @Prop() public allowHalf: boolean = false;

  /**
   *  This property focus the ul when component is mounted
   */
  @Prop() public autoFocus: boolean = false;

  /**
   *  This property sets the caracter to display as symbol
   */
  @Prop() public character: string = "";

  /**
   *  This property replaces character for an icon
   */
  @Prop() public icon: string = "star";

  /**
   *  This property makes the component "read only"
   */
  @Prop() public disabled: boolean = false;

  /**
   *  This property sets the number of stars
   */
  @Prop() public count: number = 5;

  /**
   *  This property sets the initial value
   */
  @Prop() public defaultValue: number = 0;

  /**
   *  This property sets the size of the rate component
   */
  @Prop() public size: number = 20;

  /**
   *  This property sets the color
   */
  @Prop() public color: string = "#fadb14";

  /**
   *  This property sets the initial value
   */

  @Prop({ mutable: true }) public configuration?: any = {};
  /**
   *  State
   */
  @State() public starList: Array<object> = [];
  @State() public value: number = this.defaultValue;
  @State() public isComponentReady: boolean = false;

  /**
   *  Public API Events
   */
  @Event() public onBlur: EventEmitter;
  @Event() public onChange: EventEmitter;
  @Event() public onFocus: EventEmitter;
  @Event() public onHoverChange: EventEmitter;
  @Event() public onKeyDown: EventEmitter;

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
  public async blurComponent() {
    const ul: any = this.el.shadowRoot.children.item(1);
    ul.blur();
  }

  @Method()
  public async focusComponent() {
    const ul: any = this.el.shadowRoot.children.item(1);
    ul.focus();
  }

  /**
   * Lifecycle methods
   */
  public componentWillLoad() {
    // this._init();
    this.handleGenerateStarList(this.value);
    this.isComponentReady = true;
  }

  public componentDidLoad() {
    if (this.autoFocus) {
      this.focusComponent(); // AutoFocus
    }
  }

  private getCharacterOrIcon = () => {
    return this.character !== "" ? (
      this.character
    ) : (
      <nova-font-awesome iconName={this.icon} />
    );
  };

  /**
   * Event handlers
   */
  private handleSetValue(newValue) {
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

  private handleGenerateStarList(numberOfStars: number): void {
    if (this.isComponentReady && this.disabled) return; // Disable Changes

    // Eliminate Reminder if half stars are not allowed
    if (!this.allowHalf) numberOfStars = Math.floor(numberOfStars);

    const starList = [];

    const color = {
      color: `${this.color}`
    };

    // Fill Star (allowHalf is false)
    let filledStar = i => {
      return (
        <li>
          <span
            class="on"
            onMouseOver={() => this._handleOnHover(i)}
            onMouseOut={() => this._handleOnHover(this.value)}
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
            onMouseOver={() => this._handleOnHover(i)}
            onMouseOut={() => this._handleOnHover(this.value)}
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
            onMouseOver={() => this._handleOnHover(i - 0.5)}
            onMouseOut={() => this._handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i - 0.5)}
            style={color}
          >
            {this.getCharacterOrIcon()}
          </span>
          <span
            class="on right"
            onMouseOver={() => this._handleOnHover(i)}
            onMouseOut={() => this._handleOnHover(this.value)}
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
            onMouseOver={() => this._handleOnHover(i - 0.5)}
            onMouseOut={() => this._handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i - 0.5)}
          >
            {this.getCharacterOrIcon()}
          </span>
          <span
            class="right"
            onMouseOver={() => this._handleOnHover(i)}
            onMouseOut={() => this._handleOnHover(this.value)}
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
            onMouseOver={() => this._handleOnHover(i - 0.5)}
            onMouseOut={() => this._handleOnHover(this.value)}
            onClick={() => this.handleSetValue(i - 0.5)}
            style={color}
          >
            {this.getCharacterOrIcon()}
          </span>
          <span
            class="right"
            onMouseOver={() => this._handleOnHover(i)}
            onMouseOut={() => this._handleOnHover(this.value)}
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

  private _handleOnHover(value) {
    this.handleGenerateStarList(value);
    this.onHoverChange.emit(value);
  }

  public render(): HTMLNovaRateElement {
    const { size } = this;

    const fontSize = {
      fontSize: `${size}px`
    };

    return (
      <ul
        tabindex="0"
        onKeyDown={(e): void => this.handleOnKeyPressed(e)}
        onBlur={(): CustomEvent => this.onBlur.emit()}
        onFocus={(): CustomEvent => this.onFocus.emit()}
        style={fontSize}
      >
        {this.starList}
      </ul>
    );
  }
}
