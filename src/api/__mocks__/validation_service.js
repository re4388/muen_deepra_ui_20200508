let result = {
  free: jest.fn(() => 42)
}


export default {
  startValidation: jest.fn(() => Promise.resolve({
    result
  })),
  getValidationOutput: jest.fn(() => Promise.resolve({
    result
  })),
  exportFiles: jest.fn(() => Promise.resolve({
    result
  })),
  getOrderedFileList: jest.fn(() => Promise.resolve({
    result
  })),
}

