import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  bucketUrl = API_CONFIG.bucketBaseUrl + "prod"; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.produtoService.findByCategoria(this.navParams.get("id"))
      .subscribe(response => {
        this.items = response['content'];
        this.getImageIfExist();
      }, error => {});
  }

  getImageIfExist() {

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(reponse => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${item.id}-small.jpg`;
      },
      error => {})
    }
      
    }

    
    showProduto(id: string) {
    this.navCtrl.push('ProdutoDetailPage', {id: id});
  }

}
