import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileInformationService } from '../../services/file-information.service';
import { ColumnOrder } from 'src/app/shared/models/ColumnOrder';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  file: File;
  fileType: string;
  columnOrder: ColumnOrder = {Caliper: undefined, Density: undefined, Neutron: undefined, Gr: undefined, Depth: undefined, Sp: undefined, Lld: undefined, Dt: undefined};
  constructor(private toastr: ToastrService, private fileInformationService: FileInformationService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.file = files[0];
    this.fileType = this.file.name.split('.')[1].toLowerCase()
    if (this.fileType != 'las'){
      this.toastr.error("only las files are allowed", "Unvalid Extention");
      this.fileType = undefined;
    }
  }

  process() {
    this.fileInformationService.process(this.file, this.columnOrder);
  }

  selectColumn(value, type) {
    if (type === "depth"){
      this.columnOrder.Depth = Number.parseInt(value);
      if(value === '-1')
        this.columnOrder.Depth = undefined;
    }
    else if (type === "gr"){
      this.columnOrder.Gr = Number.parseInt(value);
      if(value === '-1')
        this.columnOrder.Gr = undefined;
    }
    else if (type === "caliper"){
      this.columnOrder.Caliper = Number.parseInt(value);
      if(value === '-1')
        this.columnOrder.Caliper = undefined;
    }
    else if (type === "sp"){
      this.columnOrder.Sp = Number.parseInt(value);
      if(value === '-1')
        this.columnOrder.Sp = undefined;
    }
    else if (type === "density"){
      this.columnOrder.Density = Number.parseInt(value);
      if(value === '-1')
        this.columnOrder.Density = undefined;
    }
    else if (type === "neutron"){
      this.columnOrder.Neutron = Number.parseInt(value);
      if(value === '-1')
        this.columnOrder.Neutron = undefined;
    }
    else if (type === "lld"){
      this.columnOrder.Lld = Number.parseInt(value);
      if(value === '-1')
        this.columnOrder.Lld = undefined;
    }
    else if (type === "dt"){
      this.columnOrder.Dt = Number.parseInt(value);
      if(value === '-1')
        this.columnOrder.Dt = undefined;
    }
  }

}
