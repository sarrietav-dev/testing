import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  value = 'A value';

  constructor() {}

  getValue() {
    return this.value;
  }

  setValue(newValue: string) {
    this.value = newValue;
  }

  getPromiseValue() {
    return Promise.resolve(this.value);
  }

  getObservableValue() {
    return of(this.value);
  }
}
