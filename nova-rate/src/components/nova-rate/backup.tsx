// import { Component, Prop, State, EventEmitter, Event, h } from "@stencil/core";

// @Component({
//   tag: "nova-rate",
//   styleUrl: "nova-rate.scss",
//   shadow: true
// })
// export class MyRatingComponent {
//   @Prop() allowClear: boolean = false;
//   @Prop() allowHalf: boolean = false;
//   // autoFocus
//   @Prop() character: string = "\u2605";
//   @Prop() disabled: boolean = false;

//   @Prop() count: number = 5;
//   @Prop({ mutable: true }) defaultValue: number = 0;
//   @Prop({ mutable: true }) value: number = this.defaultValue;

//   @State() mounted: boolean = false;

//   @State() starList: Array<object> = [];

//   @Event() onRatingUpdated: EventEmitter;

//   componentWillLoad() {
//     this.allowHalf
//       ? this.createHalfStarList(this.value)
//       : this.createStarList(this.value);

//     this.mounted = true;
//   }

//   setValue(newValue) {
//     this.allowClear && this.value === newValue
//       ? (this.value = 0)
//       : (this.value = newValue);

//     this.allowHalf
//       ? this.createHalfStarList(this.value)
//       : this.createStarList(this.value);

//     // this.onRatingUpdated.emit({ defaultValue: this.defaultValue });
//   }

//   createHalfStarList(numberOfStars: number) {
//     if (this.mounted && this.disabled) {
//       return;
//     }

//     let starList = [];

//     let fill = i => {
//       return (
//         <li>
//           <span class="background">{this.character}</span>
//           <span
//             class="on left"
//             onMouseOver={() => this.createHalfStarList(i - 0.5)}
//             onMouseOut={() => this.createHalfStarList(this.value)}
//             onClick={() => this.setValue(i - 0.5)}
//           >
//             {this.character}
//           </span>
//           <span
//             class="on right"
//             onMouseOver={() => this.createHalfStarList(i)}
//             onMouseOut={() => this.createHalfStarList(this.value)}
//             onClick={() => this.setValue(i)}
//           >
//             {this.character}
//           </span>
//         </li>
//       );
//     };

//     let empty = i => {
//       return (
//         <li>
//           <span class="background">{this.character}</span>
//           <span
//             class="left"
//             onMouseOver={() => this.createHalfStarList(i - 0.5)}
//             onMouseOut={() => this.createHalfStarList(this.value)}
//             onClick={() => this.setValue(i - 0.5)}
//           >
//             {this.character}
//           </span>
//           <span
//             class="right"
//             onMouseOver={() => this.createHalfStarList(i)}
//             onMouseOut={() => this.createHalfStarList(this.value)}
//             onClick={() => this.setValue(i)}
//           >
//             {this.character}
//           </span>
//         </li>
//       );
//     };

//     let half = i => {
//       return (
//         <li>
//           <span class="background">{this.character}</span>
//           <span
//             class="on left"
//             onMouseOver={() => this.createHalfStarList(i - 0.5)}
//             onMouseOut={() => this.createHalfStarList(this.value)}
//             onClick={() => this.setValue(i - 0.5)}
//           >
//             {this.character}
//           </span>
//           <span
//             class="right"
//             onMouseOver={() => this.createHalfStarList(i)}
//             onMouseOut={() => this.createHalfStarList(this.value)}
//             onClick={() => this.setValue(i)}
//           >
//             {this.character}
//           </span>
//         </li>
//       );
//     };

//     for (let i = 1; i <= this.count; i++) {
//       if (numberOfStars - i + 1 === 0.5) {
//         starList.push(half(i));
//       } else if (i <= numberOfStars) {
//         starList.push(fill(i));
//       } else {
//         starList.push(empty(i));
//       }
//     }

//     this.starList = starList;
//   }

//   createStarList(numberOfStars: number) {
//     numberOfStars = Math.floor(numberOfStars); // Eliminate Reminder
//     let starList = [];

//     let fill = i => {
//       return (
//         <li>
//           <span
//             class="on"
//             onMouseOver={() => this.createStarList(i)}
//             onMouseOut={() => this.createStarList(this.value)}
//             onClick={() => this.setValue(i)}
//           >
//             {this.character}
//           </span>
//         </li>
//       );
//     };

//     let empty = i => {
//       return (
//         <li>
//           <span
//             class="off"
//             onMouseOver={() => this.createStarList(i)}
//             onMouseOut={() => this.createStarList(this.value)}
//             onClick={() => this.setValue(i)}
//           >
//             {this.character}
//           </span>
//         </li>
//       );
//     };

//     for (let i = 1; i <= this.count; i++) {
//       if (i <= numberOfStars) {
//         starList.push(fill(i));
//       } else {
//         starList.push(empty(i));
//       }
//     }

//     this.starList = starList;
//   }

//   render() {
//     return (
//       <div>
//         <ul>{this.starList}</ul>
//       </div>
//     );
//   }
// }
