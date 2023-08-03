import { Component } from '@angular/core';
import { BaseHelper } from './utils/baseHelper';
import { Clipboard } from '@capacitor/clipboard';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  dark: boolean = false;
  menuConfig: Array<{
    title: string;
    url: string;
    icon: string;
  }> = [
    {
      title: 'Home',
      url: '/tabs/timeline',
      icon: 'home',
    }
  ];
  constructor(protected b: BaseHelper) { }
  writeToClipboard = async (string:string) => {
    await Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string
    });
    this.b.toast('Copied to clipboard');
  };

}
