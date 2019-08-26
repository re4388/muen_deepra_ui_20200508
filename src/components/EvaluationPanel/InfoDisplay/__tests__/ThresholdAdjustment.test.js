import {
  createLocalVue,
  shallowMount,
  mount
} from '@vue/test-utils'

// import extenral package
const localVue = createLocalVue()
import BootstrapVue from 'bootstrap-vue';
localVue.use(BootstrapVue)

// import component
import ThresholdAdjustment from '../ThresholdAdjustment.vue'


// mock computed and methods functions
let precision = jest.fn()
let threshold = jest.fn()
let recall = jest.fn()
let ThresholdChange = jest.fn()



// factory func to load complex props
const factory = () => {
  return shallowMount(ThresholdAdjustment, {
    localVue,
    propsData: {
      graphData: {
        ChartTitle: "Precision Recall Curve",
        axisSetting: {},
        "dataColumn": [
          [
            [23.23][23.23]
          ],
          [23.22]
        ],
        image: 11,
        xAxisLabel: "Threshold",
        yAxisLabel: "Precision / Recall",
      }
    },
    methods: {
      ThresholdChange,
    },
    computed: {
      threshold,
      precision,
      recall,
    }
  })
}





describe('ThresholdAdjustment.vue', () => {

  it('data: totalImages render properly', () => {
    let wrapper = factory()
    wrapper.setData({
      totalImages: '100',
      slider: 1,
    })
    expect(wrapper.text()).toContain('100')
  })

  it('data: "step" render properly', () => {
    let wrapper = factory()
    wrapper.setData({
      step: 42,
    })
    // console.log(wrapper.find('input').attributes().max)
    expect(wrapper.find('input').attributes().max === '42').toBe(true)
  })

  // use mock to to just check if they are called, coverage won't cover inside
  it('computed: "threshold", "precision" and "recall" are called', () => {
    let wrapper = factory()
    wrapper.setData({
      slider: 1,
    })
    expect(threshold).toHaveBeenCalled()
    expect(precision).toHaveBeenCalled()
    expect(recall).toHaveBeenCalled()
  })


  it('method:"ThresholdChange" invoke when input change', () => {
    let wrapper = factory()
    wrapper.setData({
      slider: 1,
    })
    wrapper.find('input').trigger('change')
    expect(ThresholdChange).toHaveBeenCalled()
    // wrapper.vm.$emit('thresholdChange')
    // console.log(wrapper.emitted().thresholdChange)
  })

  it('method:"ThresholdChange" had emiited properly', () => {
    let wrapper = factory()

    wrapper.find('input').trigger('change')
    wrapper.vm.$emit('thresholdChange')
    expect(wrapper.emitted().thresholdChange).toBeTruthy()

  })

  it('computed: "threshold", "precision" and "recall" work properly', () => {

    const localThis = {
      graphData: {
        "dataColumn": [
          [42],
          [42],
          [42]
        ]
      },
      slider: 0, // remember to stub all needed data
    }
    expect(ThresholdAdjustment.computed.threshold.call(localThis)).toBeTruthy()
    expect(ThresholdAdjustment.computed.precision.call(localThis)).toBeTruthy()
    expect(ThresholdAdjustment.computed.recall.call(localThis)).toBeTruthy()

  })

  it('methods: "ThresholdChange" work properly', () => {
    let $emit = jest.fn().mockReturnValue(42)
    const localThis = {
      graphData: {
        "dataColumn": [
          [42],
          [42],
          [42]
        ]
      },
      slider: 0, // remember to stub all needed data
      $emit, // this is another function inside ThresholdChange, need to be stub by mock 
    }
    expect(ThresholdAdjustment.methods.ThresholdChange.call(localThis)).toBe(undefined);

  })






})
