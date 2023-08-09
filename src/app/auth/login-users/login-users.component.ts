import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CryptoJsService } from '../../shared/crypto-js.service';
import { Usuario } from 'src/app/modules/users/models/Usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrls: ['./login-users.component.scss']
})
export class LoginUsersComponent {
  loginForm: FormGroup | any;
  submitted = false;
  encryptedUserDataKey = 'user_data';
  notification: string | any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private cryptoJsService: CryptoJsService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password).subscribe(
      (users: Usuario[]) => {
        if (users.length > 0) {
          const userData = users[0];
          const encryptedUserData = this.cryptoJsService.encrypt(userData);
          localStorage.setItem(this.encryptedUserDataKey, encryptedUserData);
          this.toastr.success('Login efetuado com sucesso!', 'Projeto Arq');
          this.router.navigate(['/users']);
        } else {
          this.toastr.error('Usuário inválido!', 'Projeto Arq');
        }
      },
      (error) => {
        this.toastr.error('Ocorreu um erro ao fazer login.', 'Projeto Arq');
        console.error(error);
      }
    );
  }

}
