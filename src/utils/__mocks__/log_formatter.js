const mock = jest.fn().mockImplementation(() => {
  return {
    fromTraining: jest.fn()
  };
});

export default mock;






// class LogFormatter {
//   static fromTraining(resp, digit = 6) {
//     var metricString = resp.metricInfo.map((item) => {
//       return `${item.metric}: ${item.value.toFixed(digit)}`
//     }).join(', ')
//     return `Stage [${resp.stageInfo.current}/${resp.stageInfo.total}]` +
//       ` - Epoch [${resp.epochInfo.current}/${resp.epochInfo.total}]` +
//       ` - Iteration [${resp.iterationInfo.current}/${resp.iterationInfo.total}]` +
//       ` - ${metricString}`
//   }

//   static fromPrediction(resp) {}
// }


// export {
//   LogFormatter
// }