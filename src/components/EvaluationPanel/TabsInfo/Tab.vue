<template>
  <div v-if="name === currentView" class="tab">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      name: {
        type: String,
        // required: true    -> adding this line will invoke test warning
      },
      currentView: {
        type: String,
        // required: true    -> adding this line will invoke test warning
      },
    }

  }

</script>

<style>

</style>
