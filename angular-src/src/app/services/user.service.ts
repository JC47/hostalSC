import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private servidor=environment.api_host;

  constructor(private http:HttpClient) { }


  public signupUser(user_signup){
    let url=this.servidor+"/usuario/add";
    let body = JSON.parse(user_signup);
    let headers =new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept':'application/json'
    });
    return this.http.post(url,body,{headers})
  }
}
