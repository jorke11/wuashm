import { ConfigProvider } from './../../providers/config/config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ModalOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-order',
  templateUrl: 'modal-order.html',
})
export class ModalOrderPage {

  form:any
  data:any
  ip:any
  headers:any
  total:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public config:ConfigProvider,public viewCtrl:ViewController) {
    this.headers= new Headers();
    this.form={};
    this.form.services={}
    this.data=[];
    this.ip=this.config.SERVER_IP;
    this.total=0;

    this.headers.append("Content-Type","application/json");
    this.headers.append("Accept","application/json");
    this.headers.append("Access-Control-Allow-Origin","*");
    this.headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    this.getTypeVehicle()
  }

  getTypeVehicle(){
    this.http.get(this.ip + "/getTypeVehicle",{headers: this.headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data=data.data;
      },
      err=>{
        console.log("error");
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderPage');
  }

  reserve(){
    let headers= new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    headers.append("Access-Control-Allow-Origin","*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    console.log(this.form)
    this.http.post(this.ip + "/reserveW",this.form,{headers: headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        if(data.status){
          this.viewCtrl.dismiss(data.data)
        }
      },
      err=>{
        console.log("error");
      }
    );
  }

  getVehicle(event){
    this.total = event.value;
    
  }

  close(){
    this.viewCtrl.dismiss()
  }

}
