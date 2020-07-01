import { Injectable } from '@angular/core';
import { SwParameters } from '../../../shared/models/SwParameters';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwParametersService {

  private swParameters: SwParameters = { a: 1, m: 2, n: 2, Rw: 0.03 };
  private subject = new BehaviorSubject(this.swParameters);

  constructor() {
    if (!localStorage.getItem('swParameters')) {
      this.subject.next(this.swParameters);
      localStorage.setItem('swParameters', JSON.stringify(this.swParameters));
    }
    else {
      this.swParameters = JSON.parse(localStorage.getItem('swParameters'));
      this.subject.next(this.swParameters);
    }
  }
  
  setSwParameters(obj) {
    this.subject.next(obj);
    localStorage.setItem('swParameters', JSON.stringify(obj));
  }

  getSwParameters() {
    return JSON.parse(localStorage.getItem('swParameters'));
  }
}
