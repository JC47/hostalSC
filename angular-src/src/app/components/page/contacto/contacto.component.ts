import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactoService} from "../../../services/contacto.service";

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  map = {
    lat: 51.678418,
    lng: 7.809007,
  };

  contactoForm:FormGroup;

  constructor(private _contactoService:ContactoService) {
    this.contactoForm= new FormGroup({
      nombre: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      telefono:new FormControl(''),
      mensaje:new FormControl('')
    })

  }

  ngOnInit() {
  }

  enviarRespuesta(){
    console.log(this.contactoForm.value)
    this._contactoService.enviarMensaje(this.contactoForm.value).subscribe(data=>{
      console.log(data)
    });
  }

}
