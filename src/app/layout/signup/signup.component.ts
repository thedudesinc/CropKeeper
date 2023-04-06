import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { LoadingService } from 'src/app/services/loading.service';
import { UserInput } from 'src/app/services/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {

  userForm: FormGroup<ControlsOf<UserInput>> = new FormGroup<ControlsOf<UserInput>>({
    displayName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)] }),
    zip: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)] }),
    allowEmailNotifications: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
    allowSiteNotifications: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
  });

  get displayName() { return this.userForm.get('displayName'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get zip() { return this.userForm.get('zip'); }

  constructor(private userservice: UserService, private loadingService: LoadingService, private router: Router) { }

  onSubmit(): void {
    this.loadingService.isLoadingVisible.next(true);
    this.userservice.create(this.userForm.getRawValue()).subscribe((response) => {
      this.loadingService.isLoadingVisible.next(false);
      this.router.navigate(['/']);
    });
  }
}
