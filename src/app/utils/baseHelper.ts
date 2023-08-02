import { User } from 'src/app/models/user';
//import {
//   LoadingController,
//   MenuController,
//   ToastController,
//   ModalController,
//   AlertController,
// } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

import {
  LoadingController, ToastController, AlertController
} from '@ionic/angular';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class BaseHelper {
  gLoading: any;
  USER_DATA = "userData";



  constructor(
    protected loadingCtrl: LoadingController,
    protected toastController: ToastController,
    protected alert: AlertController,
    // protected modal: ModalController,
    // protected router: Router,
    // protected menu: MenuController
    protected router: Router,
  ) {
    this.initLoadLoading();
  }



  async toast(message: string, duration = 1800, color = `success`) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
          // handler: () => {
          //   console.log('Cancel clicked');
          // },
        },
      ],
    });
    toast.present();
  }
  async errorToast(message: any, duration = 2250, color = `danger`) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      cssClass: 'error',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }


  async initLoadLoading() {
    this.gLoading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      duration: 15000,
    });
  }
  async loadLoading(toggle = true) {
    if (toggle) {
      if (!this.gLoading) {
        await this.initLoadLoading();
      }
      this.gLoading.present();
    } else {
      if (this.gLoading) {
        await this.gLoading.dismiss();
      }

      this.initLoadLoading();
    }
    return;
  }
  async loadAlert(header: string, msg: string, callback: () => void) {
    const alert = await this.alert.create({
      header,
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            callback();
          },
        },
      ],
    });
    alert.present();
  }

  async setStorage(key: string, value: any) {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  }
  async getStorage(key: string) {
    return await Preferences.get({ key });
  }


  navigateRoot(path: string) {
    this.router.navigateByUrl(path, { replaceUrl: true });
  }

  navigateWithParam(path: string | any[], queryParams: any) {
    if (queryParams) {
      const navigationExtras: NavigationExtras = {
        queryParams,
        replaceUrl: true,
      };
      this.router.navigate([path], navigationExtras);
    } else {
      this.router.navigate([path]);
    }
  }

  navigateForward(path: string) {
    this.router.navigate([path]);
  }
  navigateBack() {
    this.router.navigate(['..']);
  }

  routesConfig = {

    home: '/tabs',
    signin: '/login',
    signup: '/register',
  };


  async login(val: any) {
    this.setStorage(this.USER_DATA, val);
    this.navigateRoot(this.routesConfig.home);
  }
  async logout() {
    this.setStorage(this.USER_DATA, null);
    return this.navigateRoot(this.routesConfig.signin);
  }



  getMenuConfig(currentUser: User) {
    // if (currentUser) {
    //   const storeKeeperPages = [
    //     {
    //       title: 'Home',
    //       url: '/home',
    //       icon: 'md-house',
    //     },
    //     {
    //       title: 'Request for supply',
    //       url: this.routesConfig.supplyRequestMake + currentUser.profile.default_inf.title,
    //       icon: 'md-Food-warehouse',
    //     },
    //     {
    //       title: 'Previous Requests for Supply',
    //       url: this.routesConfig.supplyRequestList,
    //       icon: 'md-Add-document',
    //     },
    //     {
    //       title: 'Previous Requests for Return',
    //       url: this.routesConfig.supplyReturnList,
    //       icon: 'md-Transition-site',
    //     },
    //     {
    //       title: 'Add Supply to store',
    //       url: this.routesConfig.supplyAddToStore + '/' + currentUser.profile.default_inf.title,
    //       icon: 'md-Food-warehouse',
    //     },
    //     {
    //       title: 'Inter Facility Food',
    //       url: this.routesConfig.supplyInterFacility + '/' + currentUser.profile.default_inf.title,
    //       icon: 'md-Response',
    //     },
    //     {
    //       title: 'Return Inter Facility Food',
    //       url: this.routesConfig.supplyReturnInterFacility + '/' + currentUser.profile.default_inf.title,
    //       icon: 'md-Previous-item',
    //     },
    //     {
    //       title: 'Manage Ins',
    //       url: this.routesConfig.manageSupplyListSupplyTransactions, //     '/manage-supplylist/supply-transaction',
    //       icon: 'md-Distribution-site',
    //     },
    //     {
    //       title: 'Put Back Supply to PP',
    //       url: this.routesConfig.supplyAddPutBack + '/' + currentUser.profile.default_inf.title,
    //       icon: 'md-Previous-item',
    //     },
    //     {
    //       title: 'Manage Put Backs',
    //       url: '/manage-supplylist/put-back',
    //       icon: 'md-Distribution-site',
    //     },
    //     {
    //       title: 'Manage Outs',
    //       url: this.routesConfig.manageSupplyListOutList,
    //       icon: 'md-Out-of-platform',
    //     },
    //     {
    //       title: 'Available Supply Items',
    //       url: this.routesConfig.supplyAvaiableItems,
    //       icon: 'md-Preparedness',

    //     }
    //   ];
    //   const facilitySuperVisonPages = [
    //     {
    //       title: 'Home',
    //       url: '/home',
    //       icon: 'md-house',
    //     },
    //     {
    //       title: 'Add Child',
    //       url: this.routesConfig.childAdd,
    //       icon: 'md-add',
    //     },
    //     {
    //       title: 'Children',
    //       url: this.routesConfig.childList,
    //       icon: 'md-children',
    //     },

    //     // {
    //     //   title: 'Children Transferred In',
    //     //   url: this.routesConfig.transferInChildList,
    //     //   icon: 'md-Permanent-camp',
    //     // },
    //     // {
    //     //   title: 'Children Transferred Out',
    //     //   url: this.routesConfig.transferOutChildList,
    //     //   icon: 'md-Temporary-camp',
    //     // },
    //     {
    //       title: 'Add PLW',
    //       url: this.routesConfig.plwAdd,
    //       icon: 'md-add',
    //     },
    //     {
    //       title: 'PLW',
    //       url: this.routesConfig.plwList,
    //       icon: 'md-pregnant',
    //     },
    //     // {
    //     //   title: 'PLW Transferred In',
    //     //   url: this.routesConfig.transferInPlwList,
    //     //   icon: 'md-Permanent-camp',
    //     // },
    //     // {
    //     //   title: 'PLW Transferred Out',
    //     //   url: this.routesConfig.transferOutPlwList,
    //     //   icon: 'md-Temporary-camp',
    //     // },


    //     {
    //       title: 'Process Requests',
    //       url: this.routesConfig.manageSupplyListProcessRequests,
    //       icon: 'md-Preparedness',
    //     },
    //     {
    //       title: 'Process Returns',
    //       url: this.routesConfig.manageSupplyListProcessReturn,
    //       icon: 'md-return',
    //     },
    //     {
    //       title: 'Available Supply Items',
    //       url: this.routesConfig.supplyAvaiableItems,
    //       icon: 'md-Preparedness',

    //     }
    //   ];
    //   const userPages = [
    //     {
    //       title: 'Home',
    //       url: '/home',
    //       icon: 'md-house',
    //     },
    //     {
    //       title: 'Add Child',
    //       url: this.routesConfig.childAdd,
    //       icon: 'md-add',
    //     },
    //     {
    //       title: 'Children',
    //       url: this.routesConfig.childList,
    //       icon: 'md-children',
    //     },

    //     // {
    //     //   title: 'Children Transferred In',
    //     //   url: this.routesConfig.transferInChildList,
    //     //   icon: 'md-Permanent-camp',
    //     // },
    //     // {
    //     //   title: 'Children Transferred Out',
    //     //   url: this.routesConfig.transferOutChildList,
    //     //   icon: 'md-Temporary-camp',
    //     // },
    //     {
    //       title: 'Add PLW',
    //       url: this.routesConfig.plwAdd,
    //       icon: 'md-add',
    //     },
    //     {
    //       title: 'PLW',
    //       url: this.routesConfig.plwList,
    //       icon: 'md-pregnant',
    //     },
    //     // {
    //     //   title: 'PLW Transferred In',
    //     //   url: this.routesConfig.transferInPlwList,
    //     //   icon: 'md-Permanent-camp',
    //     // },
    //     // {
    //     //   title: 'PLW Transferred Out',
    //     //   url: this.routesConfig.transferOutPlwList,
    //     //   icon: 'md-Temporary-camp',
    //     // },
    //   ];


    //   if (currentUser.user_type === 'Store Keeper') {
    //     return storeKeeperPages;
    //   }
    //   else if (currentUser.user_type === 'Facility Supervisor') {
    //     return facilitySuperVisonPages;
    //   }
    //   return userPages;
    // }
    return [];
  };

}


