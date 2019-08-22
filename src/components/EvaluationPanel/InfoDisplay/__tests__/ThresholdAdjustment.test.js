import {
  createLocalVue,
  shallowMount,
  mount
} from '@vue/test-utils'
import ThresholdAdjustment from '../ThresholdAdjustment.vue'

// localVue.use(Vuex)


const factory = () => {
  return shallowMount(ThresholdAdjustment, {
    propsData: {
      thresholdData: {
        "score": 0.3,
        "image": 100,
        "precision": 100,
        "recall": 91.4
      }
    }
  })
}



// const store = new Vuex.Store({
//   modules: {
//     auth
//   },
//   getters: {
//     toggleDevice: function (store, value) {
//       console.log("toggleDevice")
//     }
//   }
// })


describe('ThresholdAdjustment.vue', () => {

  // it('shall received the props', () => {
  //   let wrapper = factory()
  //   expect(wrapper.props().thresholdData.image).toBe(100)
  // })

  // it('shall call updateData method through props', () => {
  //   let testMethod = jest.fn()
  //   let wrapper = shallowMount(ThresholdAdjustment, {
  //     propsData: {
  //       thresholdData: {
  //         "score": 0.3,
  //         "image": 100,
  //         "precision": 98.5,
  //         "recall": 91.4
  //       }
  //     },
  //     methods: {
  //       updateData: testMethod
  //     },
  //     // store
  //   })
  //   expect(testMethod).toHaveBeenCalled()
  // })

  // it('shall update the imageNumber in data through props', () => {
  //   let wrapper = factory()
  //   expect(wrapper.vm._data.imageNumber).toBe(100)
  // })

  // it('shall emit events when ThresholdChange changed', () => {
  //   let wrapper = factory()
  //   wrapper.find('input[type="range"]').setValue(0.2)
  //   wrapper.find('input').trigger('change')
  //   expect(wrapper.emitted('threshold-change')).toHaveLength(1)

  // });

  // it(' shall call slider() of Watch when slider change', () => {
  //   let testMethod = jest.fn()
  //   let wrapper = shallowMount(ThresholdAdjustment, {
  //     propsData: {
  //       thresholdData: {
  //         "score": 0.3,
  //         "image": 100,
  //         "precision": 100,
  //         "recall": 91.4
  //       }
  //     },
  //     watch: {
  //       slider: testMethod
  //     }
  //   })
  //   wrapper.find('input[type="range"]').setValue(0.2)
  //   wrapper.find('input').trigger('change')
  //   expect(testMethod).toHaveBeenCalled()
  // })

  // assume the current algorithm b/n precision and slider value
  // TODO: need to rewrite
  // it('precision value shall change when slider change', () => {
  //   let wrapper = factory()
  //   wrapper.find('input[type="range"]').setValue(0.2)
  //   wrapper.find('input').trigger('change')
  //   expect(wrapper.vm._data.precision).toBe(96)
  // })
})
