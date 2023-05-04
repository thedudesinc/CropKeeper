import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginInput } from 'src/app/services/models/authentication.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showLoginError: boolean = false;

  loginForm: FormGroup<ControlsOf<LoginInput>> = new FormGroup<ControlsOf<LoginInput>>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rememberMe: new FormControl(false, { nonNullable: true })
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private authenticationService: AuthenticationService, private router: Router, private loadingService: LoadingService) {}

  onSubmit(): void {
    this.loadingService.changeLoadingVisible.next(true);
    this.authenticationService.authenticate(this.loginForm.getRawValue()).subscribe((isAuthenticated => {
      if (isAuthenticated) {
        this.showLoginError = false;
        this.router.navigate(['/']).then(() => this.loadingService.changeLoadingVisible.next(false));
      } else {
        this.showLoginError = true;
        this.loadingService.changeLoadingVisible.next(false);
      }
    }));
  }
}
