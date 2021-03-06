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
  
  /* calculate the values of the updated or modified cell values */
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

    // get updated values of compute cells
    this.getNewValue();
    // add object to global cells array
    allStoredCells.push(this);
  }

  /* calculate most recent values, this will help curb incidents 
  * of the InputCell value being updated or modified after the first call
  */
  getNewValue() {
    this.value = this.fn(this.inputCells);
    this.outputCells.forEach((cell) => {
      cell.getNewValue();
    });
  }

  /* append specified callback to callbackCells */
  addCallback(cb) {
    this.callbackCells.push(cb);
    cb.initValue(this.value);
  }

  /* filter out the specified callback from the 
  * callbackCells and return the rest
  */
  removeCallback(cb) {
    this.callbackCells = this.callbackCells.filter(c => c !== cb);
  }
}

export class CallbackCell {
  constructor(fn) {
    this.callback = fn;
    this.value;
    this.values = [];
  }

  /* update the values of the ComputeCell after InputCell's value(s) 
  *  have been updated or modified after first call of ComputeCell
  */
  updateValue(value) {
    if (value !== this.value) {
      this.callback(this);

      /* if return type of callback funtion is a string, push the string
      *  value into the values array if not, push the default numbers or values
      */
      if (typeof this.callback(this) === 'string') {
        this.values.push(this.callback(this));
      } else {
        this.values.push(value);
      }
      
      this.value = value;
    }
  }

  /* set initial value of the InputCell after first call */
  initValue(value) {
    this.value = value;
  }
}
