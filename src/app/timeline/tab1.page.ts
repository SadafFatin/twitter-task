import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Tweet } from '../models/tweet';
import { TweetService } from '../services/tweet_service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  segment = 'home';
  myTimeLineTweets: Tweet[] = [];
  timelinePage = 1;

  constructor(private api: TweetService) {
   this.generateItems();
  }

  private generateItems() {
    this.api.myTimeLine(this.timelinePage).subscribe({
      next: (result) => {
        this.myTimeLineTweets = this.myTimeLineTweets.concat(result.timeline);
        this.timelinePage++;
      }

    })

  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
