import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private servidor=environment.api_host;

  constructor(private http:HttpClient) { }


  public signupUser(user_signup:Object){
    let url=this.servidor+"/usuario/add";
    let body = user_signup;
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    return this.http.post(url,body,{headers})
  }
}
