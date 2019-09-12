// import test utils and external module
import {
  shallowMount,
  mount,
  createLocalVue,
  RouterLinkStub
} from '@vue/test-utils'



// import package
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue';



const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BootstrapVue)




// import component
import Tabs from '@/components/EvaluationPanel/TabsInfo/Tabs.vue'
import Tab from '@/components/EvaluationPanel/TabsInfo/Tab.vue'
import MetricsDisplay from '@/components/EvaluationPanel/InfoDisplay/MetricsDisplay.vue'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'
import ThresholdAdjustment from '@/components/EvaluationPanel/InfoDisplay/ThresholdAdjustment.vue'
import ConfusionMatrix from '@/components/EvaluationPanel/InfoDisplay/ConfusionMatrix.vue'
import ViewerOverviewPanel from '@/components/ViewerPanel/ViewerOverviewPanel.vue'


const router = new VueRouter({
  routes: [{
    path: '/viewer-overview',
    name: 'ViewerOverview',
    component: ViewerOverviewPanel,
    meta: {
      title: 'Viewer'
    }
  }]
})




describe('Tabs.vue', () => {

  let store;

  // mock store
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        validation: {
          state: {},
          mutations: {},
          actions: {},
          getters: {
            myFunc: jest.fn().mockReturnValue('foo')
          }
        },
      }
    })
  })

  it('is a Vue instance', () => {
    // mock datainit since it will invoke gRPC getModelList
    const dataInit = jest.fn()
    const wrapper = shallowMount(Tabs, {
      store,
      localVue,
      methods: {
        dataInit,
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy()
    // console.log(wrapper.vm)
  })


  it('has router-Link to "/project-overview"', () => {
    // mock datainit since it will invoke gRPC getModelList
    const dataInit = jest.fn()

    const wrapper = shallowMount(Tabs, {
      stubs: {
        RouterLink: RouterLinkStub
      },
      localVue,
      methods: {
        dataInit,
      }
    })

    expect(wrapper.find(RouterLinkStub).props().to).toBe("/project-overview")
  })


  it('methods dataInit is called when created', () => {
    const dataInit = jest.fn()

    const wrapper = shallowMount(Tabs, {
      localVue,
      methods: {
        dataInit,
      }
    })
    expect(dataInit).toHaveBeenCalled()
  })




  it('computed: currentProjectData works properly', () => {
    const localThis = {
      $store: {
        'getters': {
          "Project/currentProject": 'foo'
        }
      }
    }
    expect(Tabs.computed.currentProjectData.call(localThis)).toBe('foo')
  })



  it('computed: selectedMatrixData works properly', () => {
    // test when tabList.lenth === 0
    const localThis1 = {
      tabList: []
    }
    expect(Tabs.computed.selectedMatrixData.call(localThis1)).toBe(undefined)

    // test wgeb tabList.lenth !== 0
    const localThis2 = {
      tabList: ['foo'],
      currentTab: 'foo',
      tabs: [{
        confusionMatrixInfo: {
          'foo': 'bar'
        },
        graph: {
          'foo': 'bar'
        },
        id: 0,
        metrics: {
          'foo': 'bar'
        },
        name: "foo"
      }, {}, {}]

    }
    expect(Tabs.computed.selectedMatrixData.call(localThis2)).toStrictEqual({
      'foo': 'bar'
    })
  })


  it('methods: modelNameChage works', () => {
    let localThis = {
      modelChange: function () {
        return null
      }
    }
    expect(Tabs.methods.modelNameChage.call(localThis)).toBe(undefined)

  })


  it('methods: getTabList works', () => {
    let localThis = {
      tabList: ['foo'],
      tabs: [{
        confusionMatrixInfo: {
          'foo': 'bar'
        },
        graph: {
          'foo': 'bar'
        },
        id: 0,
        metrics: {
          'foo': 'bar'
        },
        name: "foo"
      }, {}, {}]
    }
    expect(Tabs.methods.getTabList.call(localThis)).toBe(undefined)
  })



  it('methods: InitTab works', () => {
    let localThis = {
      getTabList: function () {
        return null
      },
      tabList: ['foo'],
      tabIndex: 'foo'
    }
    expect(Tabs.methods.InitTab.call(localThis)).toBe(undefined)
  })



  it('methods: changeTab works', () => {
    let localThis = {
      currentTab: 'foo',
    }
    let tab = {
      name: 'foo'
    }
    expect(Tabs.methods.changeTab.call(localThis, tab)).toBe(undefined)
  })


  it('methods: ThresholdChange works', () => {
    let localThis = {
      newThreshold: 'foo',
    }
    let obj = {
      result: 'foo'
    }
    expect(Tabs.methods.ThresholdChange.call(localThis, obj)).toBe(undefined)
  })


  //  loadModal() {
  //      let filePath = modPath.join(
  //        this.currentProjectData.location,
  //        "deepra_output",
  //        this.modelId,
  //        "validation"
  //      );

  // TODO: no error but can do better
  // current test will run the IO can invoke err console log, so I turn-off
  // for a momnet, but maybe it's better the mock the IO process
  // below code try to stub fileFetcher but to no avail
  it('methods: loadModal works', () => {
    let localThis = {
      modPath: {
        join(...args) {
          return null
        }
      },
      currentProjectData: {
        location: 'foo',
      },
      modelId: 'foo',
      fileFetcher: {
        readJson(...args) {
          return new Promise((resolve, reject) => {
            resolve(true)
          }).catch(err => {
            console.log(err)
          });
        }
      }
    }
    expect(Tabs.methods.loadModal.call(localThis)).toBe(undefined)
  })


  it('methods: modelChange works', () => {
    let localThis = {
      loadModal() {
        return null
      }
    }
    expect(Tabs.methods.modelChange.call(localThis)).toBe(undefined)
  })


  // getModelList() {
  //   return new Promise((resolve, reject) => {
  //     ModelManager.GetModelListByProject(this.currentProjectData.uuid).then(
  //         result => {
  //           let re = /(train_[0-9]+_[0-9]+)/;
  //           let modelHistory = [];

  //           for (let i = 0; i < result.model_list.length; i++) {
  //             let model_path = result.model_list[i];

  //             if (modFs.existsSync(model_path + "/../" + "validation")) {
  //               modelHistory.push(model_path.match(re)[0]);
  //               this.modelId = modelHistory[modelHistory.length - 1];
  //               this.modelNames = modelHistory;
  //             } else {
  //               console.log(
  //                 model_path + "/../" + "validation " + ": folder no exist"
  //               );
  //             }
  //           }
  //           // console.log(modelHistory);
  //           resolve(true);
  //         })
  //       .catch(err => {
  //         console.log("GetModelListByProject err:", err);
  //       });
  //   });
  // },

  // FIXME: promise implementation
  it('methods: getModelList works', () => {
    let dataInit = jest.fn()
    const wrapper = shallowMount(Tabs, {
      store,
      localVue,
      methods: {
        dataInit,
      }
    })


    let localThis = {
      currentProjectData: {
        uuid: 'foo'
      },
      result: {
        model_list: [1, 2, 3]
      },
      ModelManager: {
        GetModelListByProject(...args) {
          return new Promise((resolve, reject) => {
            if (true) {
              setTimeout(() => {
                resolve(' 3 sec to fulfilled');
              }, 1000);
            } else {
              reject('reject')
            }
          })
        }
      }
    }
    // wrapper.vm.$nextTick(() => {
    //   expect(Tabs.methods.getModelList.call(localThis)).toBe({})
    //   done()
    // })

    // expect(Tabs.methods.getModelList.call(localThis)).toBe({})


    // await flushPromises()
    // expect(Tabs.methods.getModelList.call(localThis)).toBe({})
  })

  // this test mock getModelList but didn't go inside the fun
  it('methods: getModelList works-2', () => {
    const dataInit = jest.fn()

    const getModelList = jest.fn((...args) => {
      return new Promise((resolve, reject) => {
        if (true) {
          setTimeout(() => {
            resolve(' 3 sec to fulfilled');
          }, 1000);
        } else {
          reject('reject')
        }
      })
    })


    const wrapper = shallowMount(Tabs, {
      store,
      localVue,
      methods: {
        dataInit,
        getModelList,
      },

    })

    getModelList()
    expect(getModelList).toHaveBeenCalled()
  })




  it('methods: dataInit works', () => {
    let localThis = {
      vueUtils: {
        clone() {
          return null
        }
      },
      $store: {
        getters: {
          "Validation/validationOutput": 'foo'
        }
      },
      getModelList() {
        return {
          then() {
            return {
              catch () {
                return null
              }
            }
          }
        }
      }
    }

    expect(Tabs.methods.dataInit.call(localThis)).toBe(undefined)
  })



  it('methods:onBtnRelabelClick works ', () => {
    let localThis = {
      $router: {
        push() {
          return null
        }
      }
    }
    expect(Tabs.methods.onBtnRelabelClick.call(localThis)).toBe(undefined)
  })




  // FIXME: just can't access validationService
  it('methods:onExport works', () => {
    // test when evnt.target.files.length === 0
    let evnt1 = {
      target: {
        files: []
      }
    }
    expect(Tabs.methods.onExport(evnt1)).toBe(undefined)

    


    let localThis2 = {
      showExportMsg: 'foo',
      // outputLocation: 'foo',
      $bvModal: {
        show(...args) {
          return null
        }
      },

      // modelId: 'foo',
      validationService: {
        exportFiles(...args) {
          return new Promise((resolve, reject) => {
            if (true) {
              setTimeout(() => {
                resolve(' 3 sec to fulfilled');
              }, 1000);
            } else {
              reject('reject')
            }
          })
        }
      }
    }
    // test when evnt.target.files.length !== 0
    let evnt2 = {
      target: {
        files: [{
          path: 'foo'
        }]
      }
    }
    // expect(Tabs.methods.onExport.call(localThis2, evnt2)).toBe(undefined)
    // const spy = jest.spyOn(Tabs.methods.onExport);
    // console.log(spy)

  })

  // FIXME: don't know how to trigger export method
  it('methods:onExport works_test2', () => {
    const dataInit = jest.fn()
    const onExport = jest.fn((...args) => {
      return new Promise((resolve, reject) => {
        if (true) {
          setTimeout(() => {
            resolve(' 3 sec to fulfilled');
          }, 1000);
        } else {
          reject('reject')
        }
      })
    })
    const wrapper = shallowMount(Tabs, {
      store,
      localVue,
      methods: {
        dataInit,
        onExport,
      },
    })

    // const tabWrapper = shallowMount(Tab)
    // console.log(wrapper.element)
    // expect(wrapper.find('.in-slot').text()).toBe('Hello world')
    // wrapper.find('input').trigger('change')
    // expect(onExport).toHaveBeenCalled()

  })




  it('filters: capitalize works ', () => {
    let val = "foo"
    expect(Tabs.filters.capitalize(val)).toBe("Foo")

    let val2 = false
    expect(Tabs.filters.capitalize(val2)).toBe("")
  })





})


// note:
// .call(this, arg1, arg2,...)
// .apply(this, [arg1, arg2,...])
// .bind(this, arg1)().bind(this, arg2)()....
