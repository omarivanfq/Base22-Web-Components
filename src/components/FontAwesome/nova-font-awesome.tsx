import { Component, Element, Prop, h } from "@stencil/core";
import Fragment from "stencil-fragment";

@Component({
  tag: "nova-font-awesome",
  styleUrls: ["nova-font-awesome.scss"],
  shadow: false
})
export class NovaFontAwesome {
  /**
   *  Element
   */
  @Element() el: HTMLElement;

  /**
   * Props
   */
  // Common attributes
  @Prop() iconName: string = "";
  @Prop() size?: string = "";
  @Prop() stylePrefix?: string = "fas";
  @Prop() options?: string = "";

  /**
   *  State
   */
  // @State() items;

  render() {
    const icon = this.iconName !== "" ? `fa-${this.iconName}` : "";
    const size = this.size !== "" ? `fa-${this.size}` : "";
    return (
      <Fragment>
        <i class={`${this.stylePrefix} ${icon} ${size} ${this.options}`} />
      </Fragment>
    );
  }
}
