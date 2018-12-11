import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../guards/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  token:FormControl;


  constructor(private _authService:AuthService,
              private router:Router) {
    this.token=new FormControl('',Validators.required);
  }

  ngOnInit() {
  }

  sendTokenGoogleAuth(){
    console.log(this.token.value)
    this._authService.loginRoot(parseInt(this.token.value)).subscribe((data:any)=>{
      localStorage.setItem("token_admin",data.token);
      this.router.navigate(['/admin','dashboard'])
    },err=>{
      console.log(err)
    });
  }

}
