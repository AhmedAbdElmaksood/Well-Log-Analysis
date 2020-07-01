import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { PorosityParametersService } from '../../services/porosity-parameters.service'
import { FileInformationService } from 'src/app/modules/well-information/services/file-information.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-porosity-parameters-form',
  templateUrl: './porosity-parameters-form.component.html',
  styleUrls: ['./porosity-parameters-form.component.css']
})
export class PorosityParametersFormComponent implements OnInit {
  public noDataFound: boolean = false;

  MD: number;
  FD: number;
  NC: Number;

  // paramsForm:FormGroup;
  paramsForm = new FormGroup({
    MD: new FormControl(2.56),
    FD: new FormControl(1.1),
    NC: new FormControl(0)
  });
  
  constructor(private toastr: ToastrService, private _paramsService: PorosityParametersService, private fileInformationService: FileInformationService) { }

  ngOnInit(): void {

    if (this.fileInformationService.current() === null) {
      this.noDataFound = true;
    }

    if (this._paramsService.getParamsFromLocal() !== null) {
      this.MD = this._paramsService.getParamsFromLocal().MD;
      this.FD = this._paramsService.getParamsFromLocal().FD;
      this.NC = this._paramsService.getParamsFromLocal().NC;
    } else {
      this.MD = 2.56
      this.FD = 1.1
      this.NC = 0
    }

  }
  

  onSubmit() {
    this._paramsService.setPorosityParams(this.paramsForm.value);
    this.toastr.success("porosity parameters has been changed successfully", "Success")
  }

}
