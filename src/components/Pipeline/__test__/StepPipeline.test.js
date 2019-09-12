import {
  shallowMount,
} from '@vue/test-utils'

import StepPipeline from '../StepPipeline'
import PipelineElement from '../PipelineElement.vue'

describe('StepPipeline', () => {

  it('is a Vue instance', () => {
    let activatePipelineElement = jest.fn()
    let initializeComponent = jest.fn()
    const wrapper = shallowMount(StepPipeline, {
      methods: {
        activatePipelineElement,
        initializeComponent
      },
      propsData: {
        contentList: [],
        enableSelectionOnClicked: true,
        indexActivated: 42,
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('props contentList render out via v-for', () => {
    let activatePipelineElement = jest.fn()
    let initializeComponent = jest.fn()
    const wrapper = shallowMount(StepPipeline, {
      methods: {
        activatePipelineElement,
        initializeComponent
      },
      propsData: {
        contentList: [{
          id: 0
        }, {
          id: 1
        }, {
          id: 2
        }],
        enableSelectionOnClicked: true,
        indexActivated: 42,
      }
    })
    let digit = wrapper.find(PipelineElement).attributes('digit')
    expect(digit).toBe("0")
  })


  it('receive onLabelSelected event and invoke notifySelection', () => {
    let notifySelection = jest.fn()
    let activatePipelineElement = jest.fn()
    let initializeComponent = jest.fn()
    const wrapper = shallowMount(StepPipeline, {
      methods: {
        activatePipelineElement,
        initializeComponent,
        notifySelection
      },
      propsData: {
        contentList: [{
          id: 0
        }, {
          id: 1
        }, {
          id: 2
        }],
        enableSelectionOnClicked: true,
        indexActivated: 42,
      }
    })
    wrapper.find(PipelineElement).vm.$emit('onLabelSelected')
    expect(notifySelection).toHaveBeenCalled()

  })

  // notifySelection(selectedId) {
  //     if (!this.enableSelectionOnClicked) return
  //     this.$emit('onStepChanged', selectedId)

  it('onStepChanged is emitted when notifySelection is called', () => {
    let activatePipelineElement = jest.fn()
    let initializeComponent = jest.fn()
    const wrapper = shallowMount(StepPipeline, {
      methods: {
        activatePipelineElement,
        initializeComponent,
      },
      propsData: {
        contentList: [{
          id: 0
        }, {
          id: 1
        }, {
          id: 2
        }],
        enableSelectionOnClicked: true,
        indexActivated: 42,
      }
    })

    wrapper.vm.notifySelection(0)
    expect(wrapper.emitted("onStepChanged")).toEqual([
      [0]
    ])
  })


  // TODO: not sure how to test "Dynamically set the height of `pipeline-rect`""
  // since when I mount jest, mount will have error if I don't mock initializeComponent
  // this is cuz jest jdom don't have some DOM api like getElementsByClassName
  // but if I mock the initializeComponent..then I can't test its side effect
  // to HTML
  it('is a Vue instance', () => {
    let activatePipelineElement = jest.fn()
    let initializeComponent = jest.fn()
    const wrapper = shallowMount(StepPipeline, {
      methods: {
        activatePipelineElement,
        initializeComponent
      },
      propsData: {
        contentList: [],
        enableSelectionOnClicked: true,
        indexActivated: 42,
      }
    })
    console.log(wrapper.html())
  })


})
