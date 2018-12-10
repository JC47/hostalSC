import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private servidor=environment.api_host;
  private token;

  constructor(private http:HttpClient) {
    this.token=localStorage.getItem('token_admin')

  }


  public signupUser(user_signup:Object){
    let url=this.servidor+"/usuario/add";
    let body = user_signup;
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    return this.http.post(url,body,{headers})
  }


  public getUsers(){
    let url=this.servidor+"/usuario/all";
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':this.token
    });

    return this.http.get(url,{headers});
  }

  public delete(id:number){
    let url=this.servidor+"/usuario/delete/"+id;
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':this.token
    });

    return this.http.delete(url,{headers});
  }


  public edit(usuario:any){
    let url=this.servidor+"/usuario/update/"+usuario._id;
    let body=usuario;
    delete body._id;
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':this.token
    });

    return this.http.put(url,body,{headers});
  }
}
