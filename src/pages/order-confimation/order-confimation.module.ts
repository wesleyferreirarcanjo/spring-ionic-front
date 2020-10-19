import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoService } from '../../services/domain/pedido.service';
import { OrderConfimationPage } from './order-confimation';

@NgModule({
  declarations: [
    OrderConfimationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfimationPage),
  ],
  providers: [
    PedidoService
  ]
})
export class OrderConfimationPageModule {}
