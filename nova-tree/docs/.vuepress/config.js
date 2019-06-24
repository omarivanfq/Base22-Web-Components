module.exports = {
  title: "AAAAA",
  description: "a ver donde encuentras esto",
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
  }
};

function getPAtternsSidebar() {
  return [
    //te regresa un arreglo
    {
      // y esto es un objeto
      title: "web  cool",
      collapsable: false,
      children: ["WHAT", "whatTwo"]
    }
  ];
}
