<template >
  <div v-if="name === currentView">
    <slot></slot>
  </div>
</template> 

<script>
  export default {
    name: 'Tab',
    props: ['TabInfo','name','currentView'],
  }


  // AllTabInfo",
  // "Tab-1info",

</script>

<style>

</style>
