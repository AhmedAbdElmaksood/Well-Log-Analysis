import { Component, OnInit } from '@angular/core';
import { FileInformationService } from 'src/app/modules/well-information/services/file-information.service';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';

@Component({
  selector: 'app-sw-calculate',
  templateUrl: './sw-calculate.component.html',
  styleUrls: ['./sw-calculate.component.css']
})

export class SwCalculateComponent implements OnInit {
  public columnOrder: ColumnOrder;
  
  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current()?.columnOrder;
  }
}
