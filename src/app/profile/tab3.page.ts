import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TweetService } from '../services/tweet_service';
import { MAPKEY_TWEETS, ARRAYKEY_TWEET, MAPKEY_FOLLOWERS, ARRAYKEY_FOLLOWERS, MAPKEY_FOLLOWINGS, ARRAYKEY_FOLLOWINGS, MAPKEY_MYTWEETS, ARRAYKEY_MYTWEET } from '../utils/helper';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  segment = MAPKEY_MYTWEETS;
  id: any;
  viewMap = new Map<string, MapObj>();



  constructor(private api: TweetService,private acRoute: ActivatedRoute) {
    this.id = this.acRoute.snapshot.paramMap.get('id');

    this.viewMap.set(MAPKEY_MYTWEETS,new MapObj(ARRAYKEY_MYTWEET,1));
    this.viewMap.set(MAPKEY_FOLLOWERS,new MapObj(ARRAYKEY_FOLLOWERS,1));
    this.viewMap.set(MAPKEY_FOLLOWINGS,new MapObj(ARRAYKEY_FOLLOWINGS,1));

    this.generateItems();

  }

  public generateItems() {
    let  viewMapObject = this.viewMap.get(this.segment);
    this.api.myAttributes(viewMapObject?.currentPage,this.segment).subscribe({
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
