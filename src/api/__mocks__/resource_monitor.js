let result = {
  free: jest.fn( () => 42)
}


export default {
  getDiskUsage: jest.fn(() => Promise.resolve({
    result
  })),
  getMemoryUsage: jest.fn(() => Promise.resolve({
    result
  })),
  getGPUMemoryUsage: jest.fn(() => Promise.resolve({
    result
  })),
}





// below is the old format, and I replace to above new cod, which is more succinctly

  // getDiskUsage: jest.fn().mockImplementation(() => {
  //     return new Promise((resolve, reject) => {
  //       resolve(result)
  //     })
  //   }),

  //   getMemoryUsage: jest.fn().mockImplementation(() => {
  //     return new Promise((resolve, reject) => {
  //       resolve(result)
  //     })
  //   }),

  //   getGPUMemoryUsage: jest.fn().mockImplementation(() => {
  //     return new Promise((resolve, reject) => {
  //       resolve(result)
  //     })
  //   }),
