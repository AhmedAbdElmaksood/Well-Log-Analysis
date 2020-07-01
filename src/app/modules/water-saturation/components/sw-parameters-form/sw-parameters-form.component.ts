import { Component, OnInit } from '@angular/core';
import { FileInformationService } from '../../../well-information/services/file-information.service';
import {SwParametersService} from '../../services/sw-parameters.service';
import { SwParameters } from '../../../../shared/models/SwParameters';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sw-parameters-form',
  templateUrl: './sw-parameters-form.component.html',
  styleUrls: ['./sw-parameters-form.component.css']
})
export class SwParametersFormComponent implements OnInit {

  public swParameters:SwParameters;
  public noDataFound: boolean = false;

  parametersForm=new FormBuilder().group({
    a:new FormControl(1),
    m:new FormControl(2),
    n:new FormControl(2),
    Rw:new FormControl(0.03)
  })

  constructor(private toastr: ToastrService, private fileInformationService: FileInformationService, private swParametersService:SwParametersService) { }

  ngOnInit(): void {
    if (this.fileInformationService.current() === null) {
      this.noDataFound = true;
    }
     if (this.swParametersService.getSwParameters() !== null) {
      this.swParameters=this.swParametersService.getSwParameters();
     }
  }

  onSubmit(){
    this.swParametersService.setSwParameters(this.parametersForm.value);
    this.toastr.success("Archie equation parameters has been changed successfully", "Success")

  }
}
