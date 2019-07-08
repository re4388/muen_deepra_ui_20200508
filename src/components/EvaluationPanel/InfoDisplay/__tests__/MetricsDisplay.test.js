import {
  shallowMount,
} from '@vue/test-utils'
import MetricDisplay from '../MetricsDisplay.vue'


describe('MetricDisplay.vue', () => {
  it('render out data "anotationText"', () => {
    const wrapper = shallowMount(MetricDisplay)
    wrapper.setData({
      anotationText: "foo"
    })
    expect(wrapper.vm.anotationText).toBe('foo')
  })

  it('render props "metricsData"', () => {
    const wrapper = shallowMount(MetricDisplay, {
      propsData: {
        metricsData: {
          foo:'bar'
        }
      }
    })
      expect(wrapper.find('td').text()).toContain('bar')
    })
  })

