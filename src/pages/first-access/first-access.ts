import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the FirstAccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-access',
  templateUrl: 'first-access.html',
})
export class FirstAccessPage {

  
  @ViewChild(Slides) slides: Slides

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu : MenuController) {
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  goHome() {
    this.navCtrl.setRoot('HomePage');
  }

  ionViewWillEnter(){
    this.menu.enable(false);
  }

  ionViewDidLeave(){
    this.menu.enable(true);
  }
}
