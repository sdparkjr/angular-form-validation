import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormValidationComponent } from './views/form-validation/form-validation.component';

const routes: Routes = [
  { path: '', redirectTo: '/cadastro', pathMatch: 'full'},
  { path: 'cadastro', component: FormValidationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
