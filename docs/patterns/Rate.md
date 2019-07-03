# Nova Rate

- Rate component to show evaluation or set a ratting value

- Based on [Ant design Rate](https://ant.design/components/rate/)

<TreeRateWrapper/>

## How do I do? (HTML Markup)

```html
<nova-transfer show-select-all show-search>
  <nova-rate></nova-rate>

  <nova-rate
    allow-clear="false"
    allow-half
    auto-focus
    icon="heart"
    count="10"
    default-value="5"
    size="40"
    color="#f44336"
  ></nova-rate>
</nova-transfer>
```

```javascript
let rating = document.querySelector("nova-rate");
rating.focusComponent();
rating.addEventListener("onChange", function(event) {
  console.log(event.detail);
});
```

## Properties

| Property        | Description                                              | Type      | Default     |
| --------------- | -------------------------------------------------------- | --------- | ----------- |
| `allowClear`    | Props Allow to clear by setting value to 0               | `boolean` | `true`      |
| `allowHalf`     | Allow half values                                        | `boolean` | `false`     |
| `autoFocus`     | Focus the component when mounted                         | `boolean` | `false`     |
| `character`     | Replace the icon for a caracter, empty will set the icon | `string`  | `""`        |
| `color`         | Sets the color                                           | `string`  | `"#fadb14"` |
| `configuration` | Sets the initial configuration                           | `any`     | `{}`        |
| `count`         | Sets the number of stars                                 | `number`  | `5`         |
| `defaultValue`  | Sets the initial value                                   | `number`  | `0`         |
| `disabled`      | Makes the component "read only"                          | `boolean` | `false`     |
| `icon`          | Sets font awesome icon                                   | `string`  | `"star"`    |
| `size`          | Sets the size of the rate component                      | `number`  | `20`        |

## Events

| Event           | Description                        | Type               |
| --------------- | ---------------------------------- | ------------------ |
| `onBlur`        | callback when component lose focus | `CustomEvent<any>` |
| `onChange`      | callback when select value         | `CustomEvent<any>` |
| `onFocus`       | callback when component get focus  | `CustomEvent<any>` |
| `onHoverChange` | callback when hover item           | `CustomEvent<any>` |
| `onKeyDown`     | callback when keydown on component | `CustomEvent<any>` |

## Methods

### `blurComponent() => Promise<void>`

remove focus

#### Returns

Type: `Promise<void>`

### `focusComponent() => Promise<void>`

get focus

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [nova-font-awesome](../FontAwesome)
