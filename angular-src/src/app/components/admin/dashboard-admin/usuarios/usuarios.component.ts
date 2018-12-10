import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {UtileriaService} from "../../../../services/utileria.service";
import {ModalDeleteArrayComponent} from "../../../modal-delete-array/modal-delete-array.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public usuarios:any;
  public sorted=false;
  public load_table:boolean=true;
  public table_view:boolean=true;
  public selected_user:any={
    _id:null
  };
  array_deleted:any[]=[];
  array_not_deleted:any[]=[];
  array_selected:any[]=[];
  public edit_user_form:FormGroup;

  @ViewChild('edit_modal') edit_modal:any;
  @ViewChild('moda_delte') modal_delete:any;
  @ViewChild('moda_delte_array') modal_delete_array:any;
  @ViewChild('modal_sure_delete')modal_sure_delete:any;
  constructor(private _userService:UserService,
              public _utilerias:UtileriaService) {
    this.array_deleted=[];
    this.updateUsers();
    this.edit_user_form=new FormGroup({
      nombre: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
      _id: new FormControl('')
    })
  }

  ngOnInit() {
  }

  private async updateUsers(){
    this.load_table=true;
    this.usuarios= await this._userService.getUsers().toPromise();
    this.usuarios=this._utilerias.addCheckItem(this.usuarios);
    this.load_table=false;
    console.log(this.usuarios)
  }

  private toggleCheckUser($event,index:number){
    this.usuarios[index].check=$event.checked;
  }

  selectUser(user:any){
    if(user==this.selected_user)
      this.selected_user={
      _id:null
      }
    else
      this.selected_user=user;
  }

  initSelected(){
    this.array_selected=[];
  }

  confirmDeletedUsers() {
    this.array_selected=[];
    for (let usuario of this.usuarios) {
      if (usuario.check)
        this.array_selected.push({_id: usuario._id, show: usuario.nombre})
    }
    if(this.array_selected.length==0){
      if(this.selected_user._id) {
        this.array_selected.push({_id: this.selected_user._id, show: this.selected_user.nombre})
        this.modal_sure_delete.openModal();
      }

    }else{
      this.modal_sure_delete.openModal();
    }


  }

  openEditUserSection(){
    let array_selected:any[]=[];
    for (let usuario of this.usuarios) {
      if (usuario.check)
        array_selected.push(usuario)
    }
    if(array_selected.length>0){
      this.edit_user_form.get('nombre').setValue(array_selected[0].nombre);
      this.edit_user_form.get('email').setValue(array_selected[0].email);
      this.edit_user_form.get('_id').setValue(array_selected[0]._id);
      this.edit_modal.show();
    }else if(this.selected_user._id){
      this.edit_user_form.get('nombre').setValue(this.selected_user.nombre);
      this.edit_user_form.get('email').setValue(this.selected_user.email);
      this.edit_user_form.get('_id').setValue(this.selected_user._id);
      this.edit_modal.show();
    }
  }

  async editUser(){
    let editedRequest;
    console.log(this.edit_user_form.value)
    editedRequest= await this._userService.edit(this.edit_user_form.value).toPromise();
    console.log(editedRequest);
  }

  async deleteUser(delete_users:any[]){
    this.load_table=true;
    this.modal_sure_delete.closeModal();
    this.array_deleted=[];
    this.array_not_deleted=[];
    for(let check of delete_users){
      let user_deleted={
        _id:check._id,
        show:check.show,
        deleted:await this._userService.delete(check._id).toPromise() ? true:false
      };
      if(user_deleted.deleted)
        this.array_deleted.push(user_deleted);
      else
        this.array_not_deleted.push(user_deleted);
    }
    this.modal_delete_array.openModal();
    this.updateUsers()
  }

}
