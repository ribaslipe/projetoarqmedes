import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';


const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: ListUsersComponent
  },
  {
      path: 'list',
      component: ListUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
