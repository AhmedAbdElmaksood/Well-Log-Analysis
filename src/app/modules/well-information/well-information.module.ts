import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellInformationRoutingModule } from './well-information-routing.module';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { DisplayInformationComponent } from './components/display-information/display-information.component';
import { DisplayLogsComponent } from './components/display-logs/display-logs.component';
import { SpLogComponent } from './components/sp-log/sp-log.component';
import { GrCaliperLogComponent } from './components/gr-caliper-log/gr-caliper-log.component';
import { DensityNeutronLogComponent } from './components/density-neutron-log/density-neutron-log.component';
import { LldLogComponent } from './components/lld-log/lld-log.component';
import { DtLogComponent } from './components/dt-log/dt-log.component';
import { LogControlComponent } from './components/log-control/log-control.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UploadFileComponent, DisplayInformationComponent, DisplayLogsComponent, SpLogComponent, GrCaliperLogComponent, DensityNeutronLogComponent, LldLogComponent, DtLogComponent, LogControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    WellInformationRoutingModule
  ],
  exports: [LogControlComponent, GrCaliperLogComponent, DensityNeutronLogComponent,LldLogComponent ]
})
export class WellInformationModule {


  

  }
