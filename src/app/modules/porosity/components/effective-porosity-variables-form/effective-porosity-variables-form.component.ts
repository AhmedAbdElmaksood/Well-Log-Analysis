import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EffectivePorosityVariablesService } from '../../services/effective-porosity-variables.service';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { EffectiveVariables } from '../../../../shared/models/EffectiveVariables';

@Component({
  selector: 'app-effective-porosity-variables-form',
  templateUrl: './effective-porosity-variables-form.component.html',
  styleUrls: ['./effective-porosity-variables-form.component.css']
})
export class EffectivePorosityVariablesFormComponent implements OnInit {

  @Output('changeVsh') changeVsh = new EventEmitter();
  @Output('submit') submit = new EventEmitter();
  VshMethods: any = ['linear', 'Larionov', 'Steiber', 'Older', 'Clavier'];
  sendParamsToParent = { "effectiveVariables": "" };

  variablesForm = new FormBuilder().group({
    bulkDensity: new FormControl('', [Validators.required]),
    vshMethodName: ['']
  })

  public effectiveVariables: EffectiveVariables;

  constructor(private effectivePorosityVariablesService: EffectivePorosityVariablesService) { }


  ngOnInit(): void {
    this.effectiveVariables = this.effectivePorosityVariablesService.getEffectiveVariables();
  }

  changeVshMethod(e) {
    this.variablesForm.controls['vshMethodName'].setValue(e.target.value);
    this.sendParamsToParent.effectiveVariables = this.variablesForm.value;
    this.changeVsh.emit(this.sendParamsToParent);
  }

  onSubmit() {
    if (this.variablesForm.value.vshMethodName == "")
      this.variablesForm.value.vshMethodName = this.effectiveVariables.vshMethodName;
    this.effectivePorosityVariablesService.setEffectiveVariables(this.variablesForm.value);
    this.sendParamsToParent.effectiveVariables = this.variablesForm.value;
    this.submit.emit(this.sendParamsToParent);
  }

}
