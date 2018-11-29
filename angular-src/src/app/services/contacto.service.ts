import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  usrlServer:string=environment.api_host;

  constructor(private  http:HttpClient) {

  }

  enviarMensaje(mensaje:any){
    let body=mensaje;
    let headers:HttpHeaders=new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept':'application/json'
    });
    let url="contactar";
    return this.http.post(url,body,{headers})
  }
}
