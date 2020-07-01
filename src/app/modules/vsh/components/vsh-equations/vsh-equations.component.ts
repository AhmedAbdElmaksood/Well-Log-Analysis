import { Component, OnInit } from '@angular/core';
import { vshParameters } from 'src/app/shared/models/VshParameters';
import { Subject } from 'rxjs';
import { FileInformationService } from 'src/app/modules/well-information/services/file-information.service';
import { EquationsParametersService } from '../../services/equations-parameters.service';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';

@Component({
  selector: 'app-vsh-equations',
  templateUrl: './vsh-equations.component.html',
  styleUrls: ['./vsh-equations.component.css']
})
export class VshEquationsComponent implements OnInit {

  public columnOrder: ColumnOrder;
  eventsSubject: Subject<vshParameters> = new Subject<vshParameters>();
  
  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current()?.columnOrder;
  }

}
