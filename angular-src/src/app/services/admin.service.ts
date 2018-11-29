import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private servidor=environment.api_host;

  constructor(private http:HttpClient) { }


  public addAdmin(user_signup:any){
    let url=this.servidor+"/admin/root";
    let body=user_signup;
    let headers =new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept':'application/json'
    });
    return this.http.post(url,body,{headers})
  }


}
