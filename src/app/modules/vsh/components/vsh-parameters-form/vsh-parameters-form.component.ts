import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EquationsParametersService } from '../../services/equations-parameters.service';

@Component({
  selector: 'app-vsh-parameters-form',
  templateUrl: './vsh-parameters-form.component.html',
  styleUrls: ['./vsh-parameters-form.component.css']
})
export class VshParametersFormComponent implements OnInit {
  public minGr: number;
  public maxGr: number;
  @Output() changeParameters = new EventEmitter();


  constructor(private equationsParametersService: EquationsParametersService) { }

  ngOnInit(): void {
    this.minGr = this.equationsParametersService.current().minGr;
    this.maxGr = this.equationsParametersService.current().maxGr;
    this.submit();
  }

  submit(){
    this.equationsParametersService.next({minGr: this.minGr, maxGr: this.maxGr});
    this.changeParameters.emit({minGr: this.minGr, maxGr: this.maxGr});
  }

  reset(){
    this.minGr = this.equationsParametersService.defaultMinGr;
    this.maxGr = this.equationsParametersService.defaultMaxGr;
    this.equationsParametersService.next({minGr: this.minGr, maxGr: this.maxGr});
    this.changeParameters.emit({minGr: this.minGr, maxGr: this.maxGr});
  }
}
