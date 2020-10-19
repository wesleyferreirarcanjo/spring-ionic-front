import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];

  page: number = 0;

  bucketUrl = API_CONFIG.bucketBaseUrl + "prod"; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService,public loadingCrtl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    const loader = this.presentLoading();
    this.produtoService.findByCategoria(this.navParams.get("id"), this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        this.getImageIfExist(start, end);
        loader.dismiss();
        console.log(this.items);
      }, error => {
        loader.dismiss();
      });
  }

  getImageIfExist(start: number, end: number) {

    for (let i = start; i < end; i++) {
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

    presentLoading() {
      const loadder = this.loadingCrtl.create({
        content: "Aguarde....!"
      });

      loadder.present();
      return loadder;
    }

  doRefresh(refresher) {
    this.items = [];
    this.page = 0;
    setTimeout(() => {
      this.loadData();

      refresher.complete();
    }, 1000);
  }

  doInfinite(scroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      

      scroll.complete();
    }, 1000);
  }

}
