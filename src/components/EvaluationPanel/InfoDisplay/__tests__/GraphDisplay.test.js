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
  mount,
  shallowMount,
} from '@vue/test-utils'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'
import GraphDisplayLineChart from '@/components/EvaluationPanel/InfoDisplay/GraphDisplayLineChart.vue'
import {JestEnvironment} from '@jest/environment';




describe('GraphDisplay.vue', () => {

  // var wrapper;
  // beforeEach(() => {
  //   wrapper = mount(GraphDisplay)
  // })

  it('description', () => {
    // let wrapper = mount(GraphDisplay,{
    //   propsData:{
    //     fillData: jest.fn( () => true)
    //   }
    // })
    // expect(wrapper.find(GraphDisplayLineChart).exists()).toBe(true)

  })
})




// describe('GraphDisplay.vue', () => {


//   it('make a sanity check', () => {

//   })

//   it('shall have child GraphDisplayLineChart', () => {
//     // expect(wrapper.find(GraphDisplayLineChart).exists()).toBe(true)
//     // expect(wrapper.contains(GraphDisplayLineChart)).toBe(true);
//   })





// })
