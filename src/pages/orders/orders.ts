import { ModalOrderPage } from './../modal-order/modal-order';
import { ConfigProvider } from './../../providers/config/config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController ,ToastController} from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  ip:any
  headers:any
  data:any
  res:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public config:ConfigProvider,public modalCtrl:ModalController,public toastCtrl:ToastController) {
    this.ip=this.config.SERVER_IP;
    this.headers= new Headers();
    this.res={};
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    
    this.headers.append("Accept","application/json");
    this.headers.append("Content-Type","application/json");
    this.headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.getOrders()
  }

  getOrders(){
    this.http.get(this.ip + "/getOrders",{headers: this.headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data = data.data;
      },
      err=>{
        console.log("error");
      }
    );
  }

  cancel(row){

    this.http.put(this.ip + "/cancel/"+row.id,row,{headers: this.headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.res = data.data;
      },
      err=>{
        console.log(JSON.stringify(err));
      }
    );

  }

  openModalNew(){
    let modal = this.modalCtrl.create(ModalOrderPage);

    modal.present();

    modal.onDidDismiss(data=>{
      let toast=this.toastCtrl.create({
        message:'Has creado una nueva Orden',
        duration:2500
      })
      
      this.data.unshift(data);
      toast.present()

    });
    
  }

}
