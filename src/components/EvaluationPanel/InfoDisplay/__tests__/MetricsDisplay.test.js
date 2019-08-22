import {
  shallowMount,
} from '@vue/test-utils'
import MetricDisplay from '../MetricsDisplay.vue'



// shall redered our the the key part of the anotationText data
// shall redner out the metricsData data
// shall received the props "metricsData" -> need to test on parent comp


describe('MetricDisplay.vue', () => {

  it('shall redered our anotation', () => {
    const wrapper = shallowMount(MetricDisplay)
    expect(wrapper.text()).toContain('2 * Precision * Sensitivity / (Precision Sensitivity)')
  })


  it('shall have props "metricsData" work correctly', () => {
    const metricsData = {
      foo: "AUC 90 %"
    }
    const wrapper = shallowMount(MetricDisplay, {
      // stub fake props for real propsData
      propsData: {
        metricsData:{
          AUC: 0.9,
          F1score: 0.1,
          Precision: 0.1,
          Sensitivity: 0.1,
          Specificity: 0.1
        }
      }
    })
    expect(wrapper.text()).toContain(metricsData.foo)
  })

})

