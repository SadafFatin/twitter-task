import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TweetUser } from '../models/tweet';
import { TweetService } from '../services/tweet_service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  token = '';
  users: TweetUser[] = [];
  usersPage = 1;

  constructor(private api: TweetService) {

  }

  private generateItems(token:string) {
    if(token){
      this.api.search(this.usersPage,{token}).subscribe({
        next: (result) => {
          console.log(result);
          this.users = this.users.concat(result.search_results);
          this.usersPage++;
        }
      })
    }


  }

  onIonInfinite(ev: any) {
    this.generateItems(this.token);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }




  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.generateItems(query);
  }



}
