const result = {
  free:23,
}


export default {
  getDiskUsage: jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      // resolve(result)
      reject(result)
    })
    // .then((result) => {
    //   console.log(result)
    //   throw new Error('Something failed');
    //   // console.log(result['free'])
    //   // console.log('Do this');
    // }).catch((result) => {
    //   console.log('Do that');
    // })
  }),

  //  getDiskUsage() {
  //    resourceMonitor.getDiskUsage().then((result) => {
  //      this.freeDiskSpace = result['free'].toFixed(2)
  //    })
  //  },
  getMemoryUsage: jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(result)
    })
    // .then((result) => {
    //   throw new Error('Something failed');
    // }).catch((result) => {
    //   // console.log('Do that');
    // })
  }),
  getGPUMemoryUsage: jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
    // .then((result) => {
    //   throw new Error('Something failed');
    //   // console.log('Do this');
    // }).catch((result) => {
    //   // console.log('Do that');
    // })
  })
}

