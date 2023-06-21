import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",redirectTo:"shows",pathMatch:'full'},
  {path:"sign",loadChildren:()=> import('./Modules/sign/sign.module').then((e)=> e.SignModule)},
  {path:"shows",loadChildren:()=> import('./Modules/shows/shows.module').then((e)=> e.ShowsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
