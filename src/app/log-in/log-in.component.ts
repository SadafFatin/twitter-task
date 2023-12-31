import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { emailPattern, errorMsgs, passPattern } from 'src/app/utils/helper';
import { AuthService } from 'src/app/services/auth_api.service';
import { BaseHelper } from 'src/app/utils/baseHelper';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {

  form: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = errorMsgs;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private b: BaseHelper
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.pattern(emailPattern)],
      password: ['', Validators.pattern(passPattern)]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    else {
      this.loading = true;
      this.authService.login(this.form.value)
        .subscribe({
          next: (response) => {
            console.log(response.token);
            this.b.login(response.token);
          }
        });
    }
  }
}
