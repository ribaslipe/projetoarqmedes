import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {}

  isUserAuthenticated(): boolean {
    return this.authService.Authenticated();
  }

  logout(){
    this.authService.logout();
  }

  public ngOnInit(): void {
    if(this.authService.Authenticated())
      this.router.navigate(['/users/list']);
    else
      this.router.navigate(['/auth/login']);
  }

}
