
export class InputCell {
  constructor(value) {
    this.value = value;
  }

  setValue(value) {
    throw new Error(
      'Remove this statement and implement this function'
    );
  }
}

export class ComputeCell {
  constructor(inputCells, fn) {
    throw new Error(
      'Remove this statement and implement this function'
    );
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
