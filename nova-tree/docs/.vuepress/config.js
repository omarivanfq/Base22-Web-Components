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
        src: "https://unpkg.com/nova-tree@0.0.4/dist/nova-tree.js"
      }
    ],
    [
      "script",
      {
        src: "https://unpkg.com/nova-transfer@0.0.1/dist/nova-transfer.js"
      }
    ],
    [
      "script",
      {
        src: "https://unpkg.com/nova-rate@0.0.1/dist/nova-rate.js"
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
      children: ["Tree", "Rate", "TreeNode", "Checkbox", "General", "Transfer"]
    }
  ];
}
