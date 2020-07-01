import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterSaturationRoutingModule } from './water-saturation-routing.module';
import { SwParametersFormComponent } from './components/sw-parameters-form/sw-parameters-form.component';
import { SwCalculateComponent } from './components/sw-calculate/sw-calculate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwLogComponent } from './components/sw-log/sw-log.component';
import { WellInformationModule } from '../well-information/well-information.module';
import { PorosityModule} from '../porosity/porosity.module'

@NgModule({
  declarations: [SwParametersFormComponent, SwCalculateComponent, SwLogComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    WaterSaturationRoutingModule,
    WellInformationModule,
    PorosityModule
  ]
})
export class WaterSaturationModule { }
