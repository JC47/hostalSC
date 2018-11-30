import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../guards/auth.service";
import {UserService} from "../../services/user.service";
import {ModalBackdropComponent, ModalContainerComponent} from "ng-uikit-pro-standard";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})



export class PageComponent implements OnInit {

  login_form:FormGroup;
  signup_form:FormGroup;

  usuario:any={
    nombre:null,
    email:null
  };

  @ViewChild('succes') success_modal:any;
  @ViewChild('danger') error_modal:any;
  @ViewChild('login') login_modal:any;
  @ViewChild('success_login') succes_login_modal:any;
  constructor( private _authService:AuthService,
               private _userService:UserService
               ) {

    this.initUser();

    console.log(this.usuario)

    this.login_form= new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })

    this.signup_form=new FormGroup({
      nombre: new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })


  }

  ngOnInit() {

  }

  setSignup(){
    console.log(this.signup_form.value);
    this._userService.signupUser(this.signup_form.value).subscribe((data:any)=>{
      this.success_modal.show();
      this.login_modal.hide();
      localStorage.setItem("token_user",data.token);
    },err=>{
      console.log(err);
      this.login_modal.hide();
      this.error_modal.show();
    })
  }


  setLogin(){
    this._authService.loginUser(this.login_form.value).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem("user",data.usuario)
      localStorage.setItem("token_user",data.token)
      localStorage.setItem("user_name",data.usuario.nombre);
      localStorage.setItem("user_email",data.usuario.email);
      this.usuario=data.usuario;
      this.succes_login_modal.show()


    },err=>{
      console.log(err);
    })
  }

  initUser(){

    this.usuario.nombre=this.getUserName()
    this.usuario.email=this.getEmailUser();

  }

  getUserName(){
    return localStorage.getItem('user_name');
  }


  getEmailUser(){
    return localStorage.getItem('user_email');
  }

  isValidToken(){
    return this._authService.isAuthenticatedUser();
  }

}
