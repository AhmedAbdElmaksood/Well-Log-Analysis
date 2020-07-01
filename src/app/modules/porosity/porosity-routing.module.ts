import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalPorosityComponent } from './components/total-porosity/total-porosity.component';
import { EffectivePorosityComponent } from './components/effective-porosity/effective-porosity.component';
import { PorosityParametersFormComponent } from './components/porosity-parameters-form/porosity-parameters-form.component';


const routes: Routes = [
  { path: 'parameters-form', component: PorosityParametersFormComponent },
  { path: 'total-porosity', component: TotalPorosityComponent },
  { path: 'effective-porosity', component: EffectivePorosityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PorosityRoutingModule { }
