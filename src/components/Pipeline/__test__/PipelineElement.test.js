import {
  shallowMount,
} from '@vue/test-utils'

import PipelineElement from '../PipelineElement'

describe('PipelineElement', () => {

  it('is a Vue instance', () => {
    const wrapper = shallowMount(PipelineElement)
    expect(wrapper.isVueInstance).toBeTruthy()
  })




  it('HTML render digit correctly ', () => {
    let wrapper = shallowMount(PipelineElement, {
      propsData: {
        digit: 22
      }
    })

    expect(wrapper.find('.number-label').text()).toContain('23')
  })



  // note:
  // I didn't write test regarding when clicking button then the emitClickedEvent method 
  // will invoke. That's because I think this is an intermediate step and the functionality
  // shall be about "click => event emit", so skip the intermediate steps shall be good
  // to code refactor
  it('when trigger click, emit onLabelSelected event', () => {
    const wrapper = shallowMount(PipelineElement)
    wrapper.find('.number-label').trigger('click')
    expect(wrapper.emitted("onLabelSelected")).toHaveLength(1)
  })




  it('when number lable is selected, bg is orange, o.w., bg is lightgray ', () => {
    const wrapper = shallowMount(PipelineElement)
    wrapper.setData({
      isSelected: true
    })
    let style = wrapper.find('.number-label').attributes('style')
    expect(style).toBe("background: orange;")


    const wrapper2 = shallowMount(PipelineElement)
    wrapper2.setData({
      isSelected: false
    })
    let style2 = wrapper2.find('.number-label').attributes('style')
    expect(style2).toBe("background: lightgray;")
  })

})
