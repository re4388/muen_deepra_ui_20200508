import {
  shallowMount,
} from '@vue/test-utils'

import StepContent from '../StepContent'

describe('StepContent', () => {

  it('is a Vue instance', () => {
    const wrapper = shallowMount(StepContent,{
      propsData:{
        content:{}
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('title and description render properly', () => {
    const wrapper = shallowMount(StepContent, {
      propsData: {
        content: {
          title:'deepra',
          description: 'is the best'
        }
      }
    })
    expect(wrapper.text()).toContain('deepra')
    expect(wrapper.text()).toContain('is the best')
  })




})
