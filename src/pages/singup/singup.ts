import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingupPage');
  }
  

  ionViewWillEnter(){
    this.menu.enable(false);
  }

  ionViewDidLeave(){
    this.menu.enable(true);
  }

  signupUser() {
    console.log("form enviado");
  }

}
