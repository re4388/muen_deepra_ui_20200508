import {
  shallowMount
} from '@vue/test-utils'
import EvaluationPanel from '@/components/EvaluationPanel/EvaluationPanel.vue'

describe('EvaluationPanel.vue', () => {
  it('renders a title', () => {
    const wrapper = shallowMount(EvaluationPanel)
    expect(wrapper.isVueInstance()).toBeTruthy()
    // console.log(wrapper.html())
  })
})






// first, we need to write the description I think...


// describe('EvaluationPanel.vue', () => {
//   it('renders a title', () => {
//     const wrapper = shallowMount(EvaluationPanel)
//     // Jest writing
//     // expect(wrapper.html().includes("Vue and TDD")).toBe(true)
//     expect(wrapper.text()).toMatch('<h2>My first image Dataset_Model 1</h2>')
//     // try other stuff in html to see how .text to what extent it cover

//   })
// })
