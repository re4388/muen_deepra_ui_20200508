class LogFormatter {
  static fromTraining (resp, digit=6) {
    var metricString = resp.metricInfo.map((item) => {
      return `${item.metric}: ${item.value.toFixed(digit)}`
    }).join(', ')
    return `Stage [${resp.stageInfo.current}/${resp.stageInfo.total}]` + 
      ` - Epoch [${resp.epochInfo.current}/${resp.epochInfo.total}]` +
      ` - Iteration [${resp.iterationInfo.current}/${resp.iterationInfo.total}]` +
      ` - ${metricString}`
  }

  static fromValidation (resp) {
    return `Iteration [${resp.iterationInfo.current + 1}/${resp.iterationInfo.total}]` + 
      ` - TTA [${resp.ttaInfo.current + 1}/${resp.ttaInfo.total}]`
  }

  static fromPrediction (resp) {
    return `Iteration [${resp.iterationInfo.current + 1}/${resp.iterationInfo.total}]` + 
      ` - TTA [${resp.ttaInfo.current + 1}/${resp.ttaInfo.total}]`
  }
}


export {
  LogFormatter
}