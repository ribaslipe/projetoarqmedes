import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUsersComponent } from './login-users/login-users.component';


const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: LoginUsersComponent
  },
  {
      path: 'login',
      component: LoginUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
