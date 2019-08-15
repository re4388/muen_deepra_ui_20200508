<template>
  <div class="label-panel d-flex flex-column" id="label-panel">
    <template v-for="(item, index) in labels">
      <label :key="index" @change="changeCheckedState">
        <input type="checkbox" class="radio" :disabled="isDisabled">
        {{item}}
      </label>
    </template>
  </div>
</template> 
     
<script>
import { EventBus } from '@/event_bus.js'

export default {
  name: 'LabelPanel',
  props: {
    labels: Array,
    selectedIndex: Number,
    selectedLabel: String,
    isSingleSelection: Boolean,
    isDisabled: Boolean,
    predictedLabel: String
  },
  mounted () {
    // this.updateCheckedLabel()
  },
  updated () {
    // call this method to update label until the whole component is rendered
    // this.updateLabel()
    this.updateCheckedLabel()
    this.updateLabelColor()
  },
  watch: {
    selectedLabel (newVal, oldVal) {
      this.updateCheckedLabel()
    },
    predictedLabel (newVal, oldVal) {
      console.log('--- predicted label changed')
      console.log(`${newVal}, ${oldVal}`)
      this.updateLabelColor()
    }
  },
  methods: {
    getLabels () {
      return [...document.getElementById('label-panel').getElementsByTagName('label')]
      
    },
    getCheckboxes () {
      return this.getLabels().map(item => item.getElementsByTagName('input')[0])
    },
    changeCheckedState (evnt) {
      if (!this.isSingleSelection) return
      var checkboxes = this.getCheckboxes()
      checkboxes.map(item => item.checked = item === evnt.target ? true : false)
    },
    updateCheckedLabel () {
      var texts = this.getLabels().map(item => item.innerText.trim())
      var idx = texts.indexOf(this.selectedLabel)
      this.getCheckboxes().map((item, index) => item.checked = index == idx ? true : false)
    },
    updateLabelColor () {
      if (this.predictedLabel === '') return
      console.log(this.predictedLabel) 
      var texts = this.getLabels().map(item => item.innerText.trim())
      var idx = texts.indexOf(this.predictedLabel)
      this.getLabels().map((item, index) => item.style.color = index == idx ? 'red' : null)
    },
    updateDifferentLabelColor () {
      
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
