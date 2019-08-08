function argMax (probs) {
  return probs.map((item, index) => [index, item]).reduce((result, curr) => {
    return result[1] > curr[1] ? result : curr
  })[0]
}

class LabelConverter {
  constructor (probArray, labels) {
    this.probArray = probArray
    this.labels = labels
  }
  toLabel (index) {
    // should be implemented by child class
  }
  convertAll () {
    return this.probArray.map((item, index) => this.toLabel(index))
  }
}

class BinaryLabelConverter extends LabelConverter {
  toLabel (index) {
    return this.labels[argMax(this.probArray[index])]
  }
}

class MulticlassLabelConverter extends LabelConverter {
  toLabel (index) {
    return this.labels[argMax(this.probArray[index])]
  }
}

const converterDict = {
  binary: BinaryLabelConverter,
  multiclass: MulticlassLabelConverter
}

export {
  BinaryLabelConverter,
  MulticlassLabelConverter,
  converterDict
}
