import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private servidor=environment.api_host;
  private token:string;

  constructor(private http:HttpClient) {
    this.token=localStorage.getItem('token_admin')
  }


  public addAdmin(admin:any){
    let url=this.servidor+"/admin/add";
    let body=admin;
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':this.token
    });
    return this.http.post(url,body,{headers})
  }

  public getAdmins(){
    let url=this.servidor+"/admin/all";
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':this.token
    });
    return this.http.get(url,{headers})
  }

  public deleteAdmin(id:string){
    let url=this.servidor+"/admin/delete/"+id;
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':this.token
    });

    return this.http.delete(url,{headers})
  }

  public editAdmin(admin:any){
    let url=this.servidor+"/admin/update/"+admin._id;
    let body=admin;
    let headers =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':this.token
    });

    return this.http.put(url,body,{headers})
  }




}
