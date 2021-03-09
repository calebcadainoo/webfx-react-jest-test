const allStoredCells = [];

export class InputCell {
  constructor(value) {
    this.value = value;
    this.outputCells = [];
  }

  setValue(value) {
    this.value = value;
    this.outputCells.forEach((cell) => {
      cell.getNewValue();
    });

    allStoredCells.forEach((storedCell) => {
      storedCell.calculateNewValues();
    });
  }

  updateOutput(cell) {
    this.outputCells.push(cell);
  }

  calculateNewValues() {
    this.callbackCells.forEach((cell) => {
      cell.updateValue(this.value);
    });
  }
}

export class ComputeCell extends InputCell {
  constructor(inputCells = [], fn) {
    super();
    this.inputCells = inputCells;
    this.callbackCells = [];
    this.fn = fn;

    inputCells.forEach((cell) => {
      cell.updateOutput(this);
    });

    this.getNewValue();
    allStoredCells.push(this);
  }

  getNewValue() {
    this.value = this.fn(this.inputCells);
    this.outputCells.forEach((cell) => {
      cell.getNewValue();
    });
  }

  set updateValue(value) {
    if (value !== this.value) {
      this.values.push(value);
      this.value = value;
    }
  }

  addCallback(cb) {
    throw new Error(
      'Remove this statement and implement this function'
    );
  }

  removeCallback(cb) {
    throw new Error(
      'Remove this statement and implement this function'
    );
  }
}

export class CallbackCell {
  constructor(fn) {
    throw new Error(
      'Remove this statement and implement this function'
    );
  }
}
