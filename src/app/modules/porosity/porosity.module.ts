import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PorosityRoutingModule } from './porosity-routing.module';
import { TotalPorosityComponent } from './components/total-porosity/total-porosity.component';
import { EffectivePorosityComponent } from './components/effective-porosity/effective-porosity.component';
import { PorosityParametersFormComponent } from './components/porosity-parameters-form/porosity-parameters-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NeutronLogComponent } from './components/neutron-log/neutron-log.component';
import {WellInformationModule} from '../well-information/well-information.module';
import { DensityLogComponent } from './components/density-log/density-log.component';
import { DensityPorosityLogComponent } from './components/density-porosity-log/density-porosity-log.component';
import { TotalPorosityLogComponent } from './components/total-porosity-log/total-porosity-log.component';
import { VshModule } from '../vsh/vsh.module';
import { EffectivePorosityVariablesFormComponent } from './components/effective-porosity-variables-form/effective-porosity-variables-form.component';
import { EffectivePorosityLogComponent } from './components/effective-porosity-log/effective-porosity-log.component';
@NgModule({
  declarations: [TotalPorosityComponent, EffectivePorosityComponent, PorosityParametersFormComponent, NeutronLogComponent, DensityLogComponent, DensityPorosityLogComponent, TotalPorosityLogComponent, EffectivePorosityVariablesFormComponent, EffectivePorosityLogComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    PorosityRoutingModule,
    WellInformationModule,
    VshModule
  ],
  exports:[EffectivePorosityLogComponent ]
  
})
export class PorosityModule { }
