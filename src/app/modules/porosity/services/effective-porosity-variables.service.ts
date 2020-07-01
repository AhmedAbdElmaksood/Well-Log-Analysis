import { Injectable } from '@angular/core';
import { EffectiveVariables } from '../../../shared/models/EffectiveVariables';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EffectivePorosityVariablesService {

  private effectiveVariablesInfo: EffectiveVariables = { 'bulkDensity': 2.4, 'vshMethodName': "linear" };
  public subject = new BehaviorSubject(this.effectiveVariablesInfo);

  constructor() {
    let local = JSON.parse(localStorage.getItem('effectiveVariables'))
    if (local !== null) {
      this.effectiveVariablesInfo = local;
      this.subject.next(local);
    } else {
      this.effectiveVariablesInfo = { 'bulkDensity': 2.2, 'vshMethodName': "linear" };
      this.subject.next(this.effectiveVariablesInfo);
      localStorage.setItem('effectiveVariables', JSON.stringify(this.effectiveVariablesInfo));
    }
  }


  setEffectiveVariables(params: EffectiveVariables) {
    this.subject.next(params);
    localStorage.setItem('effectiveVariables', JSON.stringify(params));
  }

  getEffectiveVariables() {
    return JSON.parse(localStorage.getItem('effectiveVariables'));
  }

}
