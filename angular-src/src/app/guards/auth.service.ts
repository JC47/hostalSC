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


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public loginUser(user:Object){
      let url=this.servidor+"/usuario/login";
      let body=user;
      let headers =new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept':'application/json'
      });
      return this.http.post(url,body,{headers})
  }

  public loginRoot(token:string){
    let url=this.servidor+"/admin/root";
    let body={token:token};
    let headers =new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept':'application/json'
    });
    return this.http.post(url,body,{headers})
  }



}
