import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUsersComponent } from './login-users/login-users.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class AuthModule { }
