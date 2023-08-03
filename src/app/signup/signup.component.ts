import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth_api.service';
import { BaseHelper } from 'src/app/utils/baseHelper';
import { SUCCESS_API_MESSAGE, emailPattern, errorMsgs, passPattern, usernamePattern } from 'src/app/utils/helper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  form: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = errorMsgs;

  constructor(
    private formBuilder: FormBuilder,
    private b: BaseHelper,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.pattern(usernamePattern)],
        email: ['', Validators.pattern(emailPattern)],
        password: ['', Validators.pattern(passPattern)],
        confirmpassword: new FormControl(null, [
          (c: AbstractControl) => Validators.required(c),
          Validators.pattern(passPattern),
        ])
      },
      {
        validator: this.ConfirmedValidator('password', 'confirmpassword'),
      });
  }


  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.authService.signup(this.form.value)
        .subscribe({
          next: (response) => {
            if (response.message == SUCCESS_API_MESSAGE) {
              this.b.toast(response.message);
              this.b.navigateRoot(this.b.routesConfig.signin);
            }
          }
        });

    }
  }

  goBack() {
    this.b.navigateBack();
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}
