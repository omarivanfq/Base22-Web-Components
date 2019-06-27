<template>
  <div class="nova-tree">
    <h2>Demo</h2>

    <nova-tree checkable auto-expand-parent default-expand-all> </nova-tree>
    <input
      type="button"
      value="Cambiar checkable"
      onClick="document.querySelector('nova-tree').checkable= !document.querySelector('nova-tree').checkable "
    />
    <input
      type="button"
      value="Cambiar check-checkStricty"
      onClick="document.querySelector('nova-tree').checkStrictly= !document.querySelector('nova-tree').checkStrictly"
    />
    <input
      type="button"
      value="Cambiar blockNode"
      onClick="document.querySelector('nova-tree').blockNode= !document.querySelector('nova-tree').blockNode"
    />
    <input
      type="button"
      value="Cambiar selectable"
      onClick="document.querySelector('nova-tree').selectable= !document.querySelector('nova-tree').selectable"
    />
    <input
      type="button"
      value="valor del checado"
      onClick="console.log(document.querySelector('nova-tree').checkStrictly)"
    />
  </div>
</template>
