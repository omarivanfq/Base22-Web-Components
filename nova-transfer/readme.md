# Nova Transfer
Transfer elements between two columns in an intuitive and efficient way.

## How do I do? (HTML Markup)

```html
  <nova-transfer 
    show-select-all
    show-search> 
    <p slot="source-footer" style="padding: 8px 0; text-align: center;">Footer 1</p>
    <p slot="target-footer" style="padding: 8px 0; text-align: center;">Footer 1</p>
  </nova-transfer>
 ```
 
 ```javascript
    var transfer = document.querySelector('nova-transfer');
    transfer.data = data;
    transfer.configuration = configuration;
 ```

## Customize styles
```javascript
    // customized styles for the columns
    transfer.columnStyle = {
      boxShadow: "0px 0px 53px -11px rgba(0,0,0,1)",
      width: "45%"
    } 
    // customized styles for the operation buttons (<,>)
    transfer.operationStyle = {
      width: "10%",
    }
    // customized styles for the wrapper of the component
    transfer.wrapperStyle = {
      width: "46%",
      height: "340px",
      minWidth: "500px",
      margin: "0 auto"
    }
```

## JSON Data Model

```
{
    "data": {
        "items": [
        {
        "key": "key1",
        "title": "Title1",
        "description": "Description1",
        "disabled": false
        },
        {
        "key": "key2",
        "title": "Title2",
        "description": "Description2",
        "disabled": true
        },
        {
        "key": "key3",
        "title": "Title3",
        "description": "Description3",
        "disabled": false
        }
    ],
    "targetKeys": [
        "key6", "key11"
        ]
    },
    "configuration": {
        "labels": {
          titleSource: "source",
          titleTarget: "target",
          operationLeft: "left",
          operationRight: "right",
          unit: "item",
          units: "items",
          notFoundContent: "the list is empty",
          searchPlaceholder: "search here"
        } 
    },
    "styling": {
    }
}
```
## Properties

| Property | Description | Type     | Default     |
| -------- | ----------- | -------- | ----------- |
| `items`  | `The elements that are part of this array will be present the left column. Except the elements whose keys are included in targetKeys prop.`  | `any[]` | |
| `targetKeys`  | `A set of keys of elements that are listed on the right column.`  | `string[]` | `[]` |
| `show-select-all` | `Show select all checkbox on the header`  | `boolean` | `false`|
| `show-search` | `If included, a search box is shown on each column.`  | `boolean` | `false`|
| `disabled` | `Whether disabled transfer`  | `boolean` | `false`|
| `source-footer` | `Slot that can be added to the component to show a footer in the source column` | | |
| `target-footer` | `Slot that can be added to the component to show a footer in the target column` | | |
| `columnStyle` | `A custom CSS style used for rendering the transfer columns.` | `object` | `{}`|
| `operationStyle` | `A custom CSS style used for rendering the operations column.` | `object` | `{}` |
| `wrapperStyle` | `A custom CSS style used for rendering wrapper element.` | `object` | `{}` |
| `search` | `Event function that is emitted when search field is changed` | `eventListener` | |
| `filter` | `Event function that is emitted when items are filtered in a column` | `eventListener` | |
| `transferColumn` | `Event that is emitted each time the user requests to change items from one column to another` | `eventListener` | |
| `select` | `Event that is emitted each time the user selects an item of a column` | `eventListener` | |
| `filterOption` | `A function to determine whether an item should show in search result list`  | `(inputValue, option): boolean` | |
| `renderItem` | `The function to generate the item shown on a column. `  | `Function(item):string	` | |
| `handleSelect` | `Method that allows the customization of the component. `  | `Method(key:string)` | |

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
