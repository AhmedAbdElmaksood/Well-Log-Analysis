import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { DisplayInformationComponent } from './components/display-information/display-information.component';
import { DisplayLogsComponent } from './components/display-logs/display-logs.component';

const routes: Routes = [
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'display-well-information', component: DisplayInformationComponent },
  { path: 'display-logs', component: DisplayLogsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellInformationRoutingModule { }
