import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../guards/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})



export class PageComponent implements OnInit {

  login_form:FormGroup;
  signup_form:FormGroup

  constructor( private _authService:AuthService,
               private _userService:UserService
               ) {

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
    this._userService.signupUser(this.signup_form.value).subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }


  setLogin(){
    this._authService.loginUser(this.login_form.value).subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }

}
