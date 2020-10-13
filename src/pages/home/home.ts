import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage, public menu: MenuController) {
    this.checkIfIsFirstTime();

  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }


  login() {
    this.navCtrl.setRoot('CategoriasPage')
  }

  checkIfIsFirstTime() {

    this.storage.get('first_time').then((val) => {

      if (val == null) {
        this.storage.set('first_time', 'true');
        this.navCtrl.push('FirstAccessPage');
      }
      
    });
    
  }


}
