import { Component, OnInit, Input } from '@angular/core';
import { FileInformationService } from 'src/app/modules/well-information/services/file-information.service';
import { EffectiveVariables } from 'src/app/shared/models/EffectiveVariables';
import { EffectivePorosityVariablesService } from '../../services/effective-porosity-variables.service';
import { Subject } from 'rxjs';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';

@Component({
  selector: 'app-effective-porosity',
  templateUrl: './effective-porosity.component.html',
  styleUrls: ['./effective-porosity.component.css']
})
export class EffectivePorosityComponent implements OnInit {
  public columnOrder: ColumnOrder;
  public vshComponentTitle: string = 'Edit Linear Response Log';
  public vshComponentLogType: string = 'Linear Response';
  public vshComponentId: string = 'linear';
  public isEffectiveVariablesSubmitted:boolean = false;
  eventsSubject: Subject<void> = new Subject<void>();

  constructor(private fileInformationService: FileInformationService,private effectivePorosityVariablesService:EffectivePorosityVariablesService) { }

  public effectiveVariables:EffectiveVariables=this.effectivePorosityVariablesService.getEffectiveVariables();

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current()?.columnOrder;
  }
  
  receiveData(data){
    this.effectiveVariables = data.effectiveVariables;
  }

  submitEvent(){
    this.eventsSubject.next();
  }

}
