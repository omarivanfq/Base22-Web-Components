import { Component, h } from "@stencil/core";
import Fragment from "stencil-fragment";

@Component({
  tag: "nova-tree",
  styleUrl: "nova-tree.scss",
  shadow: true
})
export class MyComponent {

  render() {
    let treeData = [
      {
        title: "0-0",
        key: "0-0",
        checked: true,
        children: [
          {
            title: "0-0-0",
            key: "0-0-0",
            checked: true,
            children: [
              { title: "0-0-0-0", key: "0-0-0-0", checked: true },
              { title: "0-0-0-1", key: "0-0-0-1", checked: true },
              { title: "0-0-0-2", key: "0-0-0-2", checked: false }
            ]
          },
          {
            title: "0-0-1",
            key: "0-0-1",
            checked: false,
            children: [
              { title: "0-0-1-0", key: "0-0-1-0", checked: false },
              { title: "0-0-1-1", key: "0-0-1-1", checked: false },
              { title: "0-0-1-2", key: "0-0-1-2", checked: false }
            ]
          },
          {
            title: "0-0-2",
            key: "0-0-2",
            checked: false
          }
        ]
      },
      {
        title: "0-1",
        key: "0-1",
        checked: false,
        children: [
          { title: "0-1-0-0", key: "0-1-0-0", checked: false },
          { title: "0-1-0-1", key: "0-1-0-1", checked: false },
          { title: "0-1-0-2", key: "0-1-0-2", checked: false }
        ]
      },
      {
        title: "0-2",
        key: "0-2",
        checked: false
      }
    ];

    const handleNode = leaf => {
      return (
        <Fragment>
          <nova-tree-node
            key={leaf.key}
            text={leaf.title}
            checked={leaf.checked}
          />

          {leaf.children ? (
            <div class="children">
              {leaf.children.map(child => handleNode(child))}
            </div>
          ) : (
            undefined
          )}
        </Fragment>
      );
    };
    return <ul>{treeData.map(leaf => handleNode(leaf))}</ul>;
  }
}
