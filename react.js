/* this array will be used as a global store house for cell values */
const allStoredCells = [];

export class InputCell {
  constructor(value) {
    this.value = value;
    // this outputCells will be used to show calculated values to the user
    this.outputCells = [];
  }

  /* this method will be used to update the value of InputCell */
  setValue(value) {
    this.value = value;
    this.outputCells.forEach((cell) => {
      cell.getNewValue();
    });
    
    // push new value set into the global store array for later referencing
    allStoredCells.forEach((storedCell) => {
      storedCell.calculateNewValues();
    });
  }

  /* update cell values for the output cell array */
  updateOutput(cell) {
    this.outputCells.push(cell);
  }
  
  // calculate the values of the updated or modified cell values
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
