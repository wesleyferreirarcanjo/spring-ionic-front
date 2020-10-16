import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.item = {id: this.navParams.get('id'), nome: this.navParams.get('nome'), preco: this.navParams.get('preco')};
    this.getImageIfExist();
  }

  getImageIfExist(){
      this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(reponse => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${this.item.id}.jpg`;
      },
      error => {})
    }
      

}
