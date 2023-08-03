import { Component, Input, OnInit } from '@angular/core';
import { TweetUser } from 'src/app/models/tweet';
import { TweetService } from 'src/app/services/tweet_service';
import { BaseHelper } from 'src/app/utils/baseHelper';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Input()
  user!: TweetUser;

  @Input()
  detail = true;

  @Input()
  unfollowCheck = false;

  constructor(private tweetService: TweetService,private b:BaseHelper) { }

  ngOnInit() { }

  follow(id: number) {
    this.tweetService.follow({"user_id": id})
    .subscribe({
      next: (response) => {
        this.b.toast(response.resp);
      }
    });
  }

  unfollow(id: number) {
    this.tweetService.unfollow({"user_id": id})
    .subscribe({
      next: (response) => {
        this.b.toast(response.resp);
      }
    });
  }


}
