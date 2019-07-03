module.exports = {
  title: "Documentacion Equipo 3 Team Hortons",
  description: "Trabajo de practicantes para Base22",
  themeConfig: {
    logo: "/assets/img/image.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Patterns", link: "/patterns/" },
      { text: "Webtraining", link: "https://google.com" }
    ],
    sidebar: {
      "/patterns/": getPAtternsSidebar()
    }
  },
  head: [
    [
      "script",
      {
        src: "https://unpkg.com/team-hortons-webcomponents@0.0.5/dist/nova.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://unpkg.com/team-hortons-webcomponents@0.0.5/dist/collection/components/nova-rate/nova-rate.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://unpkg.com/team-hortons-webcomponents@0.0.5/dist/collection/components/nova-transfer/nova-transfer.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://unpkg.com/team-hortons-webcomponents@0.0.5/dist/collection/components/nova-tree/nova-tree.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://unpkg.com/team-hortons-webcomponents@0.0.5/dist/collection/components/nova-tree-node/nova-tree-node.js"
      }
    ],
    [
      "script",
      {
        src: "https://unpkg.com/nova-tree@0.0.5/dist/nova-tree.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://unpkg.com/team-hortons-webcomponents@0.0.5/dist/collection/components/nova-tree-select/nova-tree-select.js"
      }
    ]
  ]
};

function getPAtternsSidebar() {
  return [
    //te regresa un arreglo
    {
      // y esto es un objeto
      title: "Componentes NOVA",
      collapsable: true,
      children: ["Treeselect", "Rate", "Transfer", "Tree"]
    }
  ];
}
