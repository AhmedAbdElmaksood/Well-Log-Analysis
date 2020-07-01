import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileData } from 'src/app/shared/models/FileData';
import { HeaderData } from 'src/app/shared/models/HeaderData';
import { ToastrService } from 'ngx-toastr';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';

@Injectable({
  providedIn: 'root'
})
export class FileInformationService {

  private fileData: FileData = { curve: undefined, wellInformation: undefined, parameterInformation: undefined, otherInformation: undefined, logs: undefined, columnOrder: undefined }
  private subject = new BehaviorSubject(this.fileData);

  private Global_Section_Positions_That_We_Want: number[] = [];
  private Global_Section_Positions: number[] = [];
  private Glopal_Section_Start_End: number[][] = [];
  private type = [];
  private data = [];
  private unit = [];
  private comment = [];
  private OtherInformation = [];
  private numOfColumns: number;

  private wellInformation: HeaderData;
  private parameterInformation: HeaderData;
  private curveInformation: HeaderData;

  constructor(private toastr: ToastrService) { }

  process(file: File, columnOrder: ColumnOrder) {
    let self = this;
    let reader = new FileReader();
    reader.onload = function (progressEvent) {
        try{
          self.GetStartSectionIndex(progressEvent.target.result.toString().split('\n'), columnOrder)
          self.subject.next(self.fileData);
          localStorage.setItem('fileData', JSON.stringify(self.fileData));
          self.toastr.success("Data has been extracted from the file", "Process Done")
        }catch(ex){
          self.toastr.error("Some thing went wrong", "Oops :(")
        }
    };

    reader.onerror = (event) => {
      this.toastr.error("there is something wrong with the file", "File Error");
    };

    reader.readAsText(file);
  }

  getFileObservable(){
    return this.subject;
  }

  next(data: FileData) {
    this.fileData = data;
    this.subject.next(data);
    localStorage.setItem('fileData', JSON.stringify(this.fileData));
  }

  current() {
    let fileData = this.subject.value;
    if(fileData.logs === undefined){
      fileData = JSON.parse(localStorage.getItem('fileData'))
      if(fileData !== null)
        this.next(fileData);
    }else if(localStorage.getItem('fileData') === null){
      localStorage.setItem('fileData', JSON.stringify(fileData));
    }
    return fileData
  }


  private GetStartSectionIndex(LinesOfMyFile, columnOrder) {
    let x = 0;

    for (let line = 0; line < LinesOfMyFile.length; line++) {
      if (LinesOfMyFile[line].startsWith("~W") === true) {
        this.Global_Section_Positions_That_We_Want[0] = line;
      }
      else if (LinesOfMyFile[line].startsWith("~P") === true) {
        this.Global_Section_Positions_That_We_Want[1] = line;
      }
      else if (LinesOfMyFile[line].startsWith("~C") === true) {
        this.Global_Section_Positions_That_We_Want[2] = line;
      }
      else if (LinesOfMyFile[line].startsWith("~A") === true) {
        this.Global_Section_Positions_That_We_Want[3] = line;
      }
      else if (LinesOfMyFile[line].startsWith("~O") === true) {
        this.Global_Section_Positions_That_We_Want[4] = line;
      }

      if (LinesOfMyFile[line].startsWith("~") === true) {
        this.Global_Section_Positions[x++] = line;
      }
    }

    for (let i = 0; i < this.Global_Section_Positions_That_We_Want.length; i++) {
      let EndIndex = this.Global_Section_Positions.indexOf(this.Global_Section_Positions_That_We_Want[i]) + 1;
      this.Glopal_Section_Start_End[i] = [];
      this.Glopal_Section_Start_End[i][0] = this.Global_Section_Positions_That_We_Want[i];
      this.Glopal_Section_Start_End[i][1] = this.Global_Section_Positions[EndIndex];
    }

    this.separate(LinesOfMyFile, this.Glopal_Section_Start_End[0][0] + 1, this.Glopal_Section_Start_End[0][1]);
    this.wellInformation = {
      comment: this.comment,
      type: this.type,
      data: this.data,
      unit: this.unit
    }

    this.separate(LinesOfMyFile, this.Glopal_Section_Start_End[1][0] + 1, this.Glopal_Section_Start_End[1][1]);
    this.parameterInformation = {
      comment: this.comment,
      type: this.type,
      data: this.data,
      unit: this.unit
    }

    this.separate(LinesOfMyFile, this.Glopal_Section_Start_End[2][0] + 1, this.Glopal_Section_Start_End[2][1]);
    this.curveInformation = {
      comment: this.comment,
      type: this.type,
      data: this.data,
      unit: this.unit
    }

    this.GetOtherInformation(LinesOfMyFile, this.Glopal_Section_Start_End[4][0] + 1, this.Glopal_Section_Start_End[4][1]);

    this.NumberOfColumns(LinesOfMyFile, this.Glopal_Section_Start_End[3][0]);
    let Logs = this.Create2DArray(this.numOfColumns);
    this.GetData(LinesOfMyFile, this.Glopal_Section_Start_End[3][0] + 1, Logs);

    this.fileData = { curve: this.curveInformation, otherInformation: this.OtherInformation, wellInformation: this.wellInformation, parameterInformation: this.parameterInformation, columnOrder: columnOrder, logs: Logs }
  }

  private separate(lines, start, end) {
    this.type = []; this.data = []; this.unit = []; this.comment = [];
    let count = 0;
    for (let i = start; i < end; i++) {
      if (lines[i].startsWith("#")) {
        continue;
      } else {
        //remove line breaks from str
        let str = lines[i].replace(/\s{2,}/g, ' ');
        str = str.replace(/\t/g, ' ');
        str = str.toString().trim().replace(/(\r\n|\n|\r)/g, "");
        let line = str.trim();

        this.type[count] = line.substr(0, line.indexOf('.')).trim();
        let x = line.substr(line.indexOf('.') + 1, line.indexOf(':') - (line.indexOf('.')));
        this.data[count] = x.substr(x.indexOf(" "), x.indexOf(":") - x.indexOf(" ")).trim();
        this.unit[count] = x.substr(0, x.indexOf(' ')).trim();
        this.comment[count] = line.substr(line.indexOf(":") + 1, 40).trim();
        count++;
      }
    }
  }

  private GetOtherInformation(lines, start, end) {
    let count = 0;
    for (let i = start; i < end; i++) {
      if (lines[i].startsWith("#")) {
        continue;
      } else {
        //remove line breaks from str
        this.OtherInformation[count++] = lines[i];
      }
    }
  }

  private NumberOfColumns(lines, start) {
    for (let i = start; i < (start + 20); i++) {
      if (lines[i].startsWith("#")) {
        continue;
      } else {
        let split = lines[i].replace(/\s{2,}/g, ' ').trim();
        let split1 = split.split(' ');
        this.numOfColumns = split1.length;
      }
    }
  }

  private Create2DArray(rows) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }

  private GetData(lines, start, Logs) {
    var count = 0;
    for (let i = start; i < lines.length; i++) {
      if (lines[i].startsWith("#")) {
        continue;
      } else {
        let split = lines[i].replace(/\s{2,}/g, ' ').trim();
        let split1 = split.split(' ');
        for (let j = 0; j < split1.length; j++) {
          Logs[j][count] = Number.parseFloat(split1[j]);
        }
        count++;
      }
    }
    return Logs;
  }


}
