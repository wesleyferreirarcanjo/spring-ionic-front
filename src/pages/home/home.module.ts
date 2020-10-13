import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicStorageModule.forRoot()
  ]
})
export class HomeModule {}
