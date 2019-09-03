<template>
  <div class="regression-label-panel d-flex flex-column" id="regression-label-panel">
    <template>
      <div class="originalLabel ">
        <div class="info">originalLabel</div>
        <div class="selectedLabel labelInfo" contenteditable="true">{{ selectedLabel }}</div>
        <div class="info">predictedLabel</div>
        <div class="predictedLabel labelInfo">{{ message }}</div>
        <button class="btnOverwrite" @click="overwriteLabelInfo"> overwrite / recover </button>
      </div>
    </template>
  </div>
</template> 
     
<script>
import { EventBus } from '@/event_bus.js'
import { mapGetters } from 'vuex'

export default {
  name: 'RegressionLabelPanel',
  props: {
    labels: Array,
    srcIndex: Number,   // index of selected image in `parsedFileList`
    selectedLabel: String,
    isSingleSelection: Boolean,
    isDisabled: Boolean,
    predictedLabel: String
  },
  data () {
    return {
      message: '1.5'
    }
  },
  created () {
  },
  updated () {
  },
  watch: {
    selectedLabel (newVal, oldVal) {
      this.getSelectedLabelInfo()
    },
    predictedLabel (newVal, oldVal) {
      this.overwriteLabelInfo()
    }
  },
  methods: {
    getSelectedLabelInfo () {
      return document.querySelector('.selectedLabel').innerText
    },
    overwriteLabelInfo() {
      var el = this.getSelectedLabelInfo()
      if (el !== this.message) {
        document.querySelector('.selectedLabel').innerText = this.message
        // el = this.message
        let newLabel = document.querySelector('.selectedLabel').innerText.trim()
      } else {
        document.querySelector('.selectedLabel').innerText = this.parsedFileList[this.srcIndex].label
        // el = this.selectedLabel
      }
      let newLabel = document.querySelector('.selectedLabel').innerText.trim()
      if (newLabel !== this.selectedLabel) {
        console.log(newLabel)
        console.log(this.selectedLabel)
        this.$store.dispatch('Label/updateModifiedSample', {
          sample: this.parsedFileList[this.srcIndex],
          newLabel: newLabel
        })
      }
    }
  },
  computed: {
    ...mapGetters('Viewer', {
      parsedFileList: 'parsedFileList'
    })
  }
}
</script>

<style lang="scss" scoped>
$scroll-bar-width: 5px;
.regression-label-panel {
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
.originalLabel {
  margin: 15px 0;
}
.labelInfo {
  width: 113px;
  height: 40px;
  background: white;
  color: black;
  text-align: center;
  line-height: 40px;
  margin-bottom: 5px;
}
.btn {
  width: 100px;
  border-style: none;
}
.btnOverwrite{
  color: white;
  width: 100px;
  margin: 10px 0;
  padding: 3px 0;
  background: #6c757d;
  border-style: none;
  border-radius: 3px;
}
.btnOverwrite:hover{
  background: #5a6268;
}
.info {
  padding: 0;
  margin: 0;
}
</style>