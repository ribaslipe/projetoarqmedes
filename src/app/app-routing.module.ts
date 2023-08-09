import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginUsersComponent } from './auth/login-users/login-users.component';

const routes: Routes = [
  { path: '', component: LoginUsersComponent },
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth-route.routing').then(m => m.AuthRoutingModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users-route.routing').then(m => m.UsersRoutingModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
