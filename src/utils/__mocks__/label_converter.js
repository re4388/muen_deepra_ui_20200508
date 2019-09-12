
const mock = jest.fn().mockImplementation(() => {
  return {
    BinaryLabelConverter: jest.fn(),
    MulticlassLabelConverter: jest.fn(),
    converterDict: jest.fn(),
    

  };
});

export default mock;

