<template>
  <div class="regression-label-panel d-flex flex-column" id="regression-label-panel">
    <template>
      <div class="originalLabel ">
        <p class="info">originalLabel</p>
        <p class="selectedLabel labelInfo" contenteditable="true">{{ selectedLabel }}</p>
        <!-- <p class="predictedLabel labelInfo">{{ this.predictedLabel }}</p> -->
        <p class="info">predictedLabel</p>
        <p class="predictedLabel labelInfo">{{ message }}</p>
        <button class="btnOverwrite" @click="overwriteLabelInfo"> overwrite / recover </button>
        <!-- <button class="btnSave" type="submit" @change="changeCheckedState">save</button> -->
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
    // call this method to update label until the whole component is rendered
    // this.updateCheckedLabel()
    // this.updateLabelColor()
  },
  watch: {
    // selectedLabel (newVal, oldVal) {
    //   this.updateCheckedLabel()
    // },
    // predictedLabel (newVal, oldVal) {
    //   this.updateLabelColor()
    // }
  },
  methods: {
    getSelectedLabelInfo () {
      return document.querySelector('.selectedLabel').innerText
    },
    // getCheckboxes () {
    //   return this.getLabels().map(item => item.getElementsByTagName('input')[0])
    // },
    overwriteLabelInfo() {
      // var el = document.querySelector('.selectedLabel').innerText
      var el = this.getSelectedLabelInfo()
      if (el !== this.message) {
        document.querySelector('.selectedLabel').innerText = this.message
      } else {
        document.querySelector('.selectedLabel').innerText = this.selectedLabel
        // console.log(originLabelInfo)
      }
      // if (el !== this.message) {
      //   el = this.message
      // } else {
      //   el = this.selectedLabel
      //   // console.log(originLabelInfo)
      // }
      // console.log(this.message)
      // console.log(el)
      // this.selectedLabel = this.message.replace('{{ this.selectedLabel }}', '123')
    }
    // modificationLogger (target) {
    //   let checked = target.getElementsByTagName('input')[0].checked
    //   let newLabel = checked ? target.innerText.trim() : ''
    //   console.log(this.parsedFileList[this.srcIndex])
    //   console.log(newLabel)
    //   if (newLabel !== this.selectedLabel) {
    //     this.$store.dispatch('Label/updateModifiedSample', {
    //       sample: this.parsedFileList[this.srcIndex],
    //       newLabel: newLabel
    //     })
    //   }
    // }
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
// .btnSave{
//   background: red;
// }
.info {
  padding: 0;
  margin: 0;
}
</style>