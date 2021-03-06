import { ConfigProvider } from './../../providers/config/config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-new-route',
  templateUrl: 'new-route.html',
})
export class NewRoutePage {

  description:any
  data:any
  ip:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
    public http:Http,public config:ConfigProvider) {
      this.ip=this.config.SERVER_IP;
    console.log(this.navParams.get("sendparameter"));
    this.description='';
    this.data={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRoutePage');
  }


  newRoute(){

    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    let param={description:this.description};

    this.http.post(this.ip + "/newRoute",param,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        console.log(data);
        this.data=data;

      },
      err=>{
        console.log(err);
      }
    );

    this.viewCtrl.dismiss({test:"response"});
  }

  close(){
    this.viewCtrl.dismiss({test:"response"});
  }

}

