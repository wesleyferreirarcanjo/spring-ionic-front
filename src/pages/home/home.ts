import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.checkIfIsFirstTime(storage, navCtrl);

  }

  checkIfIsFirstTime(storage: Storage, navCtrl: NavController) {

    storage.get('first_time').then((val) => {

      if (val == null) {
        storage.set('first_time', 'true');
        navCtrl.push('FirstAccessPage');
      }
      
    });
    
  }

}
