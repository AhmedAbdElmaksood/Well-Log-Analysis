import { Component, OnInit } from '@angular/core';
import { FileInformationService } from '../../../well-information/services/file-information.service';
import {PorosityEquationsService} from '../../services/porosity-equations.service'
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';


@Component({
  selector: 'app-total-porosity',
  templateUrl: './total-porosity.component.html',
  styleUrls: ['./total-porosity.component.css']
})
export class TotalPorosityComponent implements OnInit {

  public columnOrder: ColumnOrder;

  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
    this.columnOrder = this.fileInformationService.current()?.columnOrder;
  }
}
