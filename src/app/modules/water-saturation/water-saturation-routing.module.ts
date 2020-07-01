import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwCalculateComponent } from './components/sw-calculate/sw-calculate.component';
import { SwParametersFormComponent } from './components/sw-parameters-form/sw-parameters-form.component';


const routes: Routes = [
  { path: 'calculate-saturation', component: SwCalculateComponent },
  { path: 'parameters-form', component: SwParametersFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterSaturationRoutingModule { }
