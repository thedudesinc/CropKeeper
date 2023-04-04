import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { LoadingService } from 'src/app/services/loading.service';
import { UserInput } from 'src/app/services/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {

  userForm: FormGroup<ControlsOf<UserInput>> = new FormGroup<ControlsOf<UserInput>>({
    displayName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    zip: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    allowEmailNotifications: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
    allowSiteNotifications: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private userservice: UserService, private loadingService: LoadingService) { }

  onSubmit(): void {
    this.loadingService.isLoadingVisible.next(true);
    this.userservice.create(this.userForm.getRawValue()).subscribe((response) => {
      this.loadingService.isLoadingVisible.next(false);
    });
  }
}
