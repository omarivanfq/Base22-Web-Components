// https://vuepress.vuejs.org/guide/custom-themes.html#app-level-enhancements
export default ({ Vue, options, router, siteData }) => {
  Vue.config.ignoredElements = [
    // Use a `RegExp` to ignore all elements that start with "nova-"
    // 2.5+ only
    /^nova-/
  ];
};
