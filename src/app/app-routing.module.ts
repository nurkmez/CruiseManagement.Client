import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CruiseComponent } from './cruises/cruise/cruise.component';
import { CruisesComponent } from './cruises/cruises.component';


const routes: Routes = [
  {path:'', redirectTo:'cruise', pathMatch:'full'}, 
  {path:'cruises', component: CruisesComponent}, 
  {path:'cruise', children:[
    {path:'', component: CruiseComponent},
    {path:'edit/:id', component: CruiseComponent}
   ] }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
