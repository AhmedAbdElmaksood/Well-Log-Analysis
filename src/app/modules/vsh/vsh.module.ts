import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VshRoutingModule } from './vsh-routing.module';
import { GrLogComponent } from './components/gr-log/gr-log.component';
import { VshParametersComponent } from './components/vsh-parameters/vsh-parameters.component';
import { WellInformationModule } from '../well-information/well-information.module';
import { VshParametersFormComponent } from './components/vsh-parameters-form/vsh-parameters-form.component';
import { FormsModule } from '@angular/forms';
import { VshEquationsComponent } from './components/vsh-equations/vsh-equations.component';


@NgModule({
  declarations: [GrLogComponent, VshParametersComponent, VshParametersFormComponent, VshEquationsComponent],
  imports: [
    CommonModule,
    VshRoutingModule,
    FormsModule,
    WellInformationModule
  ],
  exports:[GrLogComponent]
})
export class VshModule { }
