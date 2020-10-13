import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, private storage: Storage, public menu: MenuController, public auth: AuthService) {
    this.checkIfIsFirstTime();

  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }


  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        console.log(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {}
      );

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
