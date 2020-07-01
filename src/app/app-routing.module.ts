import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './shared/components/about/about.component';
import { HomeComponent } from './shared/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';


const routes: Routes = [
  { path: 'well-information', loadChildren: () => import('./modules/well-information/well-information.module').then(m => m.WellInformationModule) },
  { path: 'vsh', loadChildren: () => import('./modules/vsh/vsh.module').then(m => m.VshModule) },
  { path: 'porosity', loadChildren: () => import('./modules/porosity/porosity.module').then(m => m.PorosityModule) },
  { path: 'water-saturation', loadChildren: () => import('./modules/water-saturation/water-saturation.module').then(m => m.WaterSaturationModule) },
  { path:'home', component: HomeComponent},
  { path:'about', component: AboutComponent},
  { path:'contact-us', component: ContactUsComponent},
  { path:'404', component: NotFoundComponent},
  { path:'**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
