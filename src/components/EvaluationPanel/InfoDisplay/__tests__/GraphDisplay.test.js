// GuideLines
// 
// Input: 
// user input
// props received
// 
// Output: 
// render out any key part of html 
// child component? 
// function invocation? 
// Vue event?
//
/////////////////////////////////////////////////////////////
//
// Output: 
// render out GraphDisplayLineChart component
// render out newValue by received props, newValue
//  
// received props -> test on parent side
//  1.graphData
//  2.newValue
// 
// 3.function/methods call
//  only internal function call...maybe we can just test if we can properly render out the component




import {
  shallowMount,
} from '@vue/test-utils'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'
import GraphDisplayLineChart from '@/components/EvaluationPanel/InfoDisplay/GraphDisplayLineChart.vue'



describe('GraphDisplay.vue', () => {
  it('fillData method is called When mounted', () => {
  //   const wrapper = shallowMount(GraphDisplay,{
  //     mocks: {
  //       fillData: jest.fn()
  //     }
  //   })
  //   expect(fillData).toHaveBeenCalledTimes(1)
  })
})
