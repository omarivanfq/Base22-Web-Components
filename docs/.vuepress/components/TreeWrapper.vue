<template>
  <div class="nova-tree">
    <h2>Demo</h2>

    <nova-tree checkable auto-expand-parent multiple selectable> </nova-tree>

    <h3>demo over</h3>
  </div>
</template>
<script>
customElements.whenDefined("nova-tree").then(function() {
  var transfer = document.querySelector(".js-nova-tree");
  transfer.componentOnReady().then(function(instanceComponent) {
    // Do something
    // instanceComponent.configuration = configuration;
    // instanceComponent.data = data;
    // instanceComponent.renderComponent();
  });
});
</script>
