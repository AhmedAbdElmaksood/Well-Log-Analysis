import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VshParametersComponent } from './components/vsh-parameters/vsh-parameters.component';
import { VshEquationsComponent } from './components/vsh-equations/vsh-equations.component';
import { WellInformationModule } from '../well-information/well-information.module';


const routes: Routes = [
  { path: 'vsh-parameters', component: VshParametersComponent },
  { path: 'vsh-equations', component: VshEquationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VshRoutingModule { }
