import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { vshParameters } from 'src/app/shared/models/VshParameters';
import { FileInformationService } from '../../well-information/services/file-information.service';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';

@Injectable({
  providedIn: 'root'
})
export class EquationsParametersService {

  public minGr: number;
  public maxGr: number;
  public defaultMinGr: number;
  public defaultMaxGr: number;
  private columnOrder: ColumnOrder;
  private grLog: number[];
  public equationsParameters: vshParameters = {maxGr: undefined, minGr: undefined};
  private subject = new BehaviorSubject(this.equationsParameters);

  constructor(private fileInformationService: FileInformationService) {
    this.columnOrder = this.fileInformationService.current().columnOrder;
    if(this.columnOrder.Gr){
        let local = JSON.parse(localStorage.getItem('equationsParameters'));
        this.grLog = this.fileInformationService.current().logs[this.columnOrder.Gr];
        this.defaultMinGr = this.minGr = Math.min.apply(null, this.grLog.filter(x => { return x > -900 }));
        this.defaultMaxGr = this.maxGr = Math.max.apply(null, this.grLog.filter(x => { return x > -900 }));
        if(local !== null){
          this.equationsParameters = local;
          this.minGr = this.equationsParameters.minGr;
          this.maxGr = this.equationsParameters.maxGr;
        }else{
          this.equationsParameters = {maxGr: this.maxGr, minGr: this.minGr};
          localStorage.setItem('equationsParameters', JSON.stringify(this.equationsParameters));
        }
    }
  }

  getParametersObservable(){
    return this.subject;
  }

  next(data: vshParameters) {
    this.equationsParameters = data;
    localStorage.setItem('equationsParameters', JSON.stringify(this.equationsParameters));
    this.subject.next(data);
  }

  current() {
    return JSON.parse(localStorage.getItem('equationsParameters'));
  }


}
