import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth_api.service';
import { BaseHelper } from '../utils/baseHelper';
import { errorMsgs, emailPattern, passPattern } from '../utils/helper';
import { TweetService } from '../services/tweet_service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  form: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = errorMsgs;

  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private b: BaseHelper
  ) {
    this.form = this.formBuilder.group({
      content: ['My thoughts', Validators.required],
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
      this.tweetService.makeTweet(this.form.value)
        .subscribe({
          next: (response) => {
            this.b.toast(response.message);
          }
        });
    }
  }

}
