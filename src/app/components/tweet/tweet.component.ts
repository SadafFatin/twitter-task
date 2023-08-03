import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {

  @Input()
  tweet!: Tweet;

  constructor() { }

  ngOnInit() {
    this.parseTweet();
  }

  parseTweet() {
    this.tweet.content = this.tweet.content.replace(/#[a-zA-Z]+/g, `<span class="highlight">$&</span>`);
    this.tweet.content = this.tweet.content.replace(/@[a-zA-Z]+/g, `<span class="highlight">$&</span>`);
  }

}
