import { Component, OnInit } from '@angular/core';
import { FileInformationService } from '../../services/file-information.service';
import { HeaderData } from 'src/app/shared/models/HeaderData';
@Component({
  selector: 'app-display-information',
  templateUrl: './display-information.component.html',
  styleUrls: ['./display-information.component.css']
})
export class DisplayInformationComponent implements OnInit {

  private wellInfo: HeaderData;
  private curveInfo: HeaderData;
  private parameterInfo: HeaderData;
  public otherInfo: string[];
  public noDataFound: boolean = false;

  public wellInfoToIterate: any[] = [];
  public curveInfoToIterate: any[] = [];
  public parameterInfoToIterate: any[] = [];

  constructor(private fileInformationService: FileInformationService) { }

  ngOnInit(): void {

    if (this.fileInformationService.current() === null) {
      this.noDataFound = true;
    }
    else {
      this.wellInfo = this.fileInformationService.current().wellInformation;
      this.curveInfo = this.fileInformationService.current().curve;
      this.parameterInfo = this.fileInformationService.current().parameterInformation;
      this.otherInfo = this.fileInformationService.current().otherInformation;

      for (let i = 0; i < this.wellInfo.type.length; i++) {
        this.wellInfoToIterate.push({
           type: this.wellInfo.type[i],
           comment: this.wellInfo.comment[i],
           data: this.wellInfo.data[i],
           unit: this.wellInfo.unit[i],
        });
      }

      for (let i = 0; i < this.curveInfo.type.length; i++) {
        this.curveInfoToIterate.push({
           type: this.curveInfo.type[i],
           comment: this.curveInfo.comment[i],
           data: this.curveInfo.data[i],
           unit: this.curveInfo.unit[i],
        });
      }

      for (let i = 0; i < this.parameterInfo.type.length; i++) {
        this.parameterInfoToIterate.push({
           type: this.parameterInfo.type[i],
           comment: this.parameterInfo.comment[i],
           data: this.parameterInfo.data[i],
           unit: this.parameterInfo.unit[i],
        });
      }

    }
  }
}

