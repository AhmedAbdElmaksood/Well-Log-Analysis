import { Component, OnInit } from '@angular/core';
import { FileInformationService } from 'src/app/modules/well-information/services/file-information.service';
import { Subject } from 'rxjs';
import { vshParameters } from 'src/app/shared/models/VshParameters';
import { ToastrService } from 'ngx-toastr';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';

@Component({
  selector: 'app-vsh-parameters',
  templateUrl: './vsh-parameters.component.html',
  styleUrls: ['./vsh-parameters.component.css']
})
export class VshParametersComponent implements OnInit {

  public columnOrder: ColumnOrder;
  eventsSubject: Subject<vshParameters> = new Subject<vshParameters>();

  constructor(private toastr: ToastrService, private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current()?.columnOrder;
  }

  onParameterChange(params) {
    this.eventsSubject.next(params);
    this.toastr.success("vsh parameters has been changed successfully", "Success")
  }

}
