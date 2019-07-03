<template>
  <div class="nova-rate">
    <h2>Demo</h2>

    <nova-rate
      class="nova-rate"
      allow-clear="false"
      allow-half
      auto-focus
      count="10"
      default-value="5"
      size="40"
      color="#f44336"
    ></nova-rate>
    <p></p>
    <input
      type="button"
      value="Cambiar allowClear"
      onClick="document.querySelector('nova-rate').allowClear= !document.querySelector('nova-rate').allowClear"
    />
    <input
      type="button"
      value="Cambiar allowHalf"
      onClick="document.querySelector('nova-rate').allowHalf= !document.querySelector('nova-rate').allowHalf"
    />
    <input
      type="button"
      value="Cambiar disabled"
      onClick="document.querySelector('nova-rate').disabled= !document.querySelector('nova-rate').disabled"
    />
  </div>
</template>

<script>
customElements.whenDefined("nova-rate").then(function() {
  var transfer = document.querySelector(".js-nova-transfer");
  transfer.componentOnReady().then(function(instanceComponent) {
    // Do something
    // instanceComponent.configuration = configuration;
    // instanceComponent.data = data;
    // instanceComponent.renderComponent();
  });
});
</script>
