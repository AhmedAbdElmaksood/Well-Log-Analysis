import { Component, OnInit } from '@angular/core';
import { FileInformationService } from '../../services/file-information.service';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';

@Component({
  selector: 'app-display-logs',
  templateUrl: './display-logs.component.html',
  styleUrls: ['./display-logs.component.css']
})
export class DisplayLogsComponent implements OnInit {
  public noDataFound: boolean = false;
  public columnOrder: ColumnOrder;

  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    if (this.fileInformationService.current() === null) {
      this.noDataFound = true;
    }else{
      this.columnOrder = this.fileInformationService.current().columnOrder;
    }
  }

}
