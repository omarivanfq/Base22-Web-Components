<template>
  <div class="nova-rate">
    <h2>Demo</h2>

    <nova-rate></nova-rate>
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
