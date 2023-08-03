import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Tweet, TweetUser } from '../models/tweet';
import { TweetService } from '../services/tweet_service';
import { ActivatedRoute } from '@angular/router';
import { ARRAYKEY_FOLLOWERS, ARRAYKEY_FOLLOWINGS, ARRAYKEY_TWEET, MAPKEY_FOLLOWERS, MAPKEY_FOLLOWINGS, MAPKEY_TWEETS } from '../utils/helper';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage  {

  segment = MAPKEY_TWEETS;
  id: any;
  viewMap = new Map<string, MapObj>();



  constructor(private api: TweetService,private acRoute: ActivatedRoute) {
    this.id = this.acRoute.snapshot.paramMap.get('id');

    this.viewMap.set(MAPKEY_TWEETS,new MapObj(ARRAYKEY_TWEET,1));
    this.viewMap.set(MAPKEY_FOLLOWERS,new MapObj(ARRAYKEY_FOLLOWERS,1));
    this.viewMap.set(MAPKEY_FOLLOWINGS,new MapObj(ARRAYKEY_FOLLOWINGS,1));

    this.generateItems();

  }

  public generateItems() {
    let  viewMapObject = this.viewMap.get(this.segment);
    this.api.userAttributes(viewMapObject?.currentPage,this.id,this.segment).subscribe({
      next: (result) => {
        console.log(result);
        viewMapObject?.increasePage();
        viewMapObject?.setContent(result);
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


class MapObj{
   arrayKey: string;
   currentPage: number;
   content: any[] = [];
   constructor(arrayKey: string,currentPage: number){
    this.arrayKey = arrayKey;
    this.currentPage = currentPage;
   }

   increasePage(){
    this.currentPage++;
   }
   setContent(result:any){
    this.content =  this.content.concat(result[this.arrayKey]);
   }
}
