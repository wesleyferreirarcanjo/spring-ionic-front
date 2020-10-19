import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartItem } from '../../models/cart-item.dto';
import { Cart } from '../../models/cart.dto';
import { ProdutoDTO } from '../../models/produto.dto';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { StorageService } from '../../services/storage.service';



@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.getImageIfExist();

  }

  getImageIfExist() {

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
      .subscribe(reponse => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${item.produto.id}-small.jpg`;
      },
      error => {})
    }
      
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuatity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuatity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total(produto: ProdutoDTO) {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.navCtrl.push('PickaddressPage');
  }
  

}
