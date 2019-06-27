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
        src: "https://unpkg.com/nova-tree@0.0.2/dist/nova-tree.js"
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
      children: ["Tree", "TreeNode", "Checkbox", "General", "Transfer"]

      //children: ["WHAT", "whatTwo"]
    }
  ];
}
