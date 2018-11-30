import { Injectable } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  servidor:string=environment.api_host;
  jwtHelper=new JwtHelperService();


  constructor(private http:HttpClient) { }


  public isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token_user');
    return !this.jwtHelper.isTokenExpired(token);
  }


  public isAuthenticatedAdmin(): boolean {
    const token = localStorage.getItem('token_admin');
    return !this.jwtHelper.isTokenExpired(token);
  }




  public loginUser(user:Object){
      let url=this.servidor+"/usuario/login";
      let body=user;
      let headers =new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept':'application/json'
      });
      return this.http.post(url,body,{headers})
  }

  public loginRoot(token:number){
    let url=this.servidor+"/admin/root";
    let body={token:token};
    console.log(body);
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    return this.http.post(url,body,{headers})
  }



}
