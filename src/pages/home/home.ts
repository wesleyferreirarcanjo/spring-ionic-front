import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';


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

  constructor(public navCtrl: NavController, private storage: StorageService, public menu: MenuController, public auth: AuthService) {
    this.checkIfFirstTime();
  }

  ionViewDidEnter(){
    if(this.storage.getLocalUser()) {
      this.auth.refreshToken().subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {}
      );
    }

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }


  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {}
      );

  }

  singup() {
    this.navCtrl.push('SingupPage');
  }

  checkIfFirstTime() {
    this.storage.checkIfIsFirstTime().then((val) => {

      if (val == null) {
        this.storage.saveFirstTime();
        this.navCtrl.push("FirstAccessPage");
      } 
    });
  }

  }



