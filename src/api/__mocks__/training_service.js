let result = {
  free: jest.fn(() => 42)
}


export default {
  startTraining: jest.fn(() => Promise.resolve({
    result
  })),
  runMNIST: jest.fn(() => Promise.resolve({
    result
  })),
  getTrainingOutput: jest.fn(() => Promise.resolve({
    result
  })),
}

