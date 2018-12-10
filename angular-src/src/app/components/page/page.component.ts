import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../guards/auth.service";
import {UserService} from "../../services/user.service";
import {IMyOptions, ModalBackdropComponent, ModalContainerComponent} from "ng-uikit-pro-standard";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})



export class PageComponent implements OnInit {

  login_form:FormGroup;
  signup_form:FormGroup;
  public nombre_user:any=null;
  public today:Date;
  public date_options: IMyOptions;
  public hotel_select:any[]=[
    {value: "01", label: "Canún"},
    {value: "02", label: "Puerto Vallarta"},
    {value: "03", label: "Los Cabos"},
    {value: "04", label: "Acapulco"},
    {value: "05", label: "Huatulco"},
    {value: "06", label: "Cuba"}
  ];
  public number_people:any[] = [
    {value: "01", label: "1"},
    {value: "02", label: "2"},
    {value: "03", label: "3"},
    {value: "04", label: "4"},
    {value: "05", label: "5"},
    {value: "06", label: "6"}
  ];

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
    this.today=new Date();
    this.date_options={
      disableUntil:{year:this.today.getFullYear(),month:this.today.getMonth()+1,day:this.today.getDate()}
    };
    this.initUser();
    this.login_form= new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
    this.signup_form=new FormGroup({
      nombre: new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
      password: new FormControl('',[Validators.required,Validators.pattern(/(?=\w*\d)(?=\w*[a-z])\S{6,16}$/)]),
      confirm_password: new FormControl('',[Validators.required])
    })
    this.signup_form.get('confirm_password').setValidators([Validators.required, this.passwordValidate.bind(this.signup_form.controls['password'])]);
    if(localStorage.getItem('user_name'))
      this.nombre_user=localStorage.getItem('user_name').split(" ",1);

  }

  ngOnInit() {

  }

  setSignup(){
    let usuario=this.signup_form.value;
    this._userService.signupUser(this.signup_form.value).subscribe((data:any)=>{
      this.success_modal.show();
      this.login_modal.hide();
      localStorage.setItem("token_user",data.token);
      localStorage.setItem("user_name",usuario.nombre);
      localStorage.setItem("user_email",usuario.email);
      this.usuario=this.signup_form.value;
      this.nombre_user=this.usuario.nombre.split(" ",1);
      this.signup_form.reset();
    },err=>{
      console.log(err);
      this.login_modal.hide();
      this.error_modal.show();
      this.signup_form.reset();

    })
  }

  passwordValidate(control: FormControl): { [s: string]: boolean } {
    let outControl: any = this;
    if (control.value != outControl.value) {
      return {password_validate: true};
    }

    return null;
  }

  setLogin(){
    this._authService.loginUser(this.login_form.value).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem("token_user",data.token)
      localStorage.setItem("user_name",data.usuario.nombre);
      localStorage.setItem("user_email",data.usuario.email);
      this.usuario=data.usuario;
      this.nombre_user=this.usuario.nombre.split(" ",1);
      this.login_modal.hide();
      this.succes_login_modal.show();
      this.signup_form.reset();
    },err=>{
      this.login_modal.hide();
      this.error_modal.show();
      this.signup_form.reset();
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


  logout(){
    localStorage.clear();
  }

}
