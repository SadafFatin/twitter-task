import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Tweet, TweetUser } from '../models/tweet';
import { TweetService } from '../services/tweet_service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {


  segment = 'home';
  users: TweetUser[] = [];
  usersPage = 1;
  filteredList: TweetUser[] = [];

  constructor(private api: TweetService) {
    this.generateItems();
  }

  private generateItems() {
    this.api.users(this.usersPage).subscribe({
      next: (result) => {
        console.log(result);
        this.users = this.users.concat(result.users);
        this.setFilteredItems();
        this.usersPage++;
      }

    })

  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }




  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
     this.filteredList = this.filterItems(query);
  }
  setFilteredItems() {
    this.filteredList = this.users;
  }
  filterItems(query: string) {
    const val = query.toLowerCase();
    return this.users.filter(
      (item: TweetUser) =>
        //Enter Phone / Moha ID / MNR / FCN Number / Progress ID
        item?.id?.toString().indexOf(val) > -1 ||
        item?.username?.toLowerCase().indexOf(val) > -1
    );
  }








}
