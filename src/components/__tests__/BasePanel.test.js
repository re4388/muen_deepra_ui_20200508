import { mount } from '@vue/test-utils'
import BasePanel from '@/components/BasePanel.vue'

describe('BasePanel.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(BasePanel)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
