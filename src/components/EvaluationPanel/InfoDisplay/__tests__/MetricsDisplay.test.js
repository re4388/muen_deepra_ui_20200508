import {
  shallowMount,
} from '@vue/test-utils'
import MetricDisplay from '../MetricsDisplay.vue'



// shall redered our the the key part of the anotationText data
// shall redner out the metricsData data
// shall received the props "metricsData" -> need to test on parent comp


describe('MetricDisplay.vue', () => {

  it('redered our the key part of the anotationText data', () => {
    const wrapper = shallowMount(MetricDisplay)
    expect(wrapper.text()).toContain('2*Precision*Sensitivity/(Precision Sensitivity)')
  })

  it('shall render out the props metricsData data', () => {
    const metricsData = {
      foo: "bar"
    }
    const wrapper = shallowMount(MetricDisplay, {
      propsData: {
        metricsData
      }
    })
    expect(wrapper.text()).toContain(metricsData.foo)
  })

})



//  ask later on, can't imp and don't know why, I think it's about css find path
// it('shall render out 5 element', () => {
//   // window.items = [{},{},{},{},{}]
//   const wrapper = shallowMount(MetricDisplay)
//   expect(wrapper.findAll('td')).toHaveLength(5)
// })