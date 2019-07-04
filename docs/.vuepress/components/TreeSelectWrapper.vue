<template>
  <div class="nova-tree-select">
    <h2>Demo</h2>

    <nova-tree-select class="js-nova-tree-select"> </nova-tree-select>
  </div>
</template>
<script>
customElements.whenDefined("nova-tree-select").then(function() {
  var transfer = document.querySelector(".js-nova-tree-select");
  transfer.componentOnReady().then(function(instanceComponent) {
    // Do something
    // instanceComponent.configuration = configuration;
    // instanceComponent.data = data;
    // instanceComponent.renderComponent();
  });
});
</script>
