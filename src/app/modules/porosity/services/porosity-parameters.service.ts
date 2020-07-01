import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class PorosityParametersService {
  private porosityParams = { "MD": undefined, "FD": undefined, "NC": undefined };
  public subject = new BehaviorSubject(this.porosityParams)
  
  constructor() {
    let local = JSON.parse(localStorage.getItem('porosityparams'))
    if (local !== null) {
      this.porosityParams = local;
      this.subject.next(local);
    } else {
      this.porosityParams = { "MD": 2.65, "FD": 1.1, "NC": 0 }
      this.subject.next(this.porosityParams);
      localStorage.setItem('porosityparams', JSON.stringify(this.porosityParams));
    }
  }

  setPorosityParams(params) {
    this.subject.next(params);
    localStorage.setItem('porosityparams', JSON.stringify(params));
  }

 

  getParamsFromLocal() {
    return JSON.parse(localStorage.getItem('porosityparams'));
  }
}
