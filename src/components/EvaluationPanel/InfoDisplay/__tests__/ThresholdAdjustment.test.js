import {
  shallowMount,
  mount
} from '@vue/test-utils'
import ThresholdAdjustment from '../ThresholdAdjustment.vue'


// test watch
// test @change="ThresholdChange

describe('ThresholdAdjustment.vue', () => {
  it('render out data "slider"', () => {
    const wrapper = mount(ThresholdAdjustment)
    // wrapper.find("[slider-data]").setValue(10)
    // wrapper.find("input").trigger("change")

    // expect(wrapper.find(".slider").text())
    //   .toBe("10")
    // wrapper.setData({
    //   slider: "foo"
    // })
    // expect(wrapper.find('h2').text()).toContain('foo')
  })



  it('render props "thresholdData"', () => {
    // const wrapper = shallowMount(ThresholdAdjustment)
    const wrapper = shallowMount(ThresholdAdjustment, {
      propsData: {
        thresholdData: {
          score: 0.3,
          image: 100,
          precision: 98.5,
          recall: 91.4
        }
      }
    })

    // expect(wrapper.find('span').text()).toContain('bar')

  })
})
