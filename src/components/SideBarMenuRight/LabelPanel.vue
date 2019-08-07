<template>
  <div class="label-panel d-flex flex-column" id="label-panel">
    <template v-for="(item, index) in labels">
      <label :key="index" @change="changeCheckedState">
        <input type="checkbox" class="radio"> {{item}}
      </label>
    </template>
  </div>
</template>   
     
<script>
export default {
  name: 'LabelPanel',
  props: {
    labels: Array,
    selectedIndex: Number,
    isSingleSelection: Boolean
  },
  created () {
  },
  computed: {
  },
  methods: {
    changeCheckedState (evnt) {
      if (!this.isSingleSelection) return
      var labels = document.getElementById('label-panel').getElementsByTagName('label')
      var checkboxes = [...labels].map(item => item.getElementsByTagName('input')[0])
      checkboxes.map(item => item.checked = item === evnt.target ? true : false)
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
$scroll-bar-width: 5px;
.label-panel {
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: $scroll-bar-width;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-track {
      background-color: #808080;
      border-radius: $scroll-bar-width;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0f0f0f;
      border-radius: $scroll-bar-width;
    }
  }
}
label {
  display: inline-block;
  margin: 0px;
  line-height: 25px;
  font-size: 18px;
  user-select: none;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>
