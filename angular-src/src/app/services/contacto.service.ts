import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  usrlServer:string="localhost:3000";

  constructor(private  http:HttpClient) {

  }

  enviarMensaje(mensaje:any){
    let body=JSON.stringify(mensaje);
    let headers:HttpHeaders=new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept':'application/json'
    });
    let url=this.usrlServer+"/contactar";

    return this.http.post(url,body,{headers})
  }
}
