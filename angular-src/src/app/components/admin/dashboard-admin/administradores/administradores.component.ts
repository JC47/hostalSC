import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "../../../../services/admin.service";
import {UtileriaService} from "../../../../services/utileria.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {
  tableData: object[] = [
    { first: 'Mark', last: 'Otto', username: '@mdo', email: 'markotto@gmail.com', country: 'USA', city: 'San Francisco' },
    { first: 'Jacob', last: 'Thornton', username: '@fat', email: 'jacobt@gmail.com', country: 'France', city: 'Paris' },
    { first: 'Larry', last: 'the Bird', username: '@twitter', email: 'larrybird@gmail.com', country: 'Germany', city: 'Berlin' },
    { first: 'Paul', last: 'Topolski', username: '@P_Topolski', email: 'ptopolski@gmail.com', country: 'Poland', city: 'Warsaw' },
    { first: 'Anna', last: 'Doe', username: '@andy', email: 'annadoe@gmail.com', country: 'Spain', city: 'Madrid' }
  ];
  public sorted = false;
  public admins:any=[];
  public admin_form:FormGroup;
  public status_data_modal:string="nuevo";
  public selected_admin:any={
    _id:null
  };
  array_deleted:any[]=[];
  array_not_deleted:any[]=[];
  array_selected:any[]=[];
  data_modal_flag:string="nuevo";
  @ViewChild('data_modal') data_modal:any;
  @ViewChild('success') success_modal:any;
  @ViewChild('danger') danger_modal:any;
  @ViewChild('modal_delete_array')modal_delete_array:any;
  @ViewChild('modal_sure_delete') modal_sure_delete:any;
  constructor(public _adminsService:AdminService,
              public _utilerias:UtileriaService) {
    this.admin_form=new FormGroup({
      _id:new FormControl(),
      nombre:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      password: new FormControl(''),
      confirm_password: new FormControl('')
    });
    this.update();
  }

  ngOnInit() {
  }

  passwordValidate(control: FormControl): { [s: string]: boolean } {
    let outControl: any = this;
    if (control.value != outControl.value) {
      return {password_validate: true};
    }

    return null;
  }

  public async update(){
    let adminsResponse:any;
    adminsResponse= await this._adminsService.getAdmins().toPromise();
    this.admins=adminsResponse.admins;
    this.deleteRootFromList();
    this.admins=this._utilerias.addCheckItem(this.admins);
  }


  openConfirEdit(){

  }

  delete(){

  }

  deleteRootFromList(){
    for(let index in this.admins){
      if(this.admins[index].role=='ROOT')
        this.admins.splice(index,1);
    }
  }

  selectAdmin(admin:any){
    if(admin==this.selected_admin)
      this.selected_admin={
        _id:null
      }
    else
      this.selected_admin=admin;
  }

  toggleCheckAdmin($event,index:number){
    this.admins[index].check=$event.checked;
    if(this.selected_admin._id)
      this.selected_admin={
        _id:null
      };
  }

  openNewAdminModal(){
    this.data_modal_flag="nuevo"
    this.admin_form.reset();
    this.admin_form.get('password').setValidators([Validators.required,Validators.pattern(/(?=\w*\d)(?=\w*[a-z])\S{6,16}$/)])
    this.admin_form.get('confirm_password').setValidators([Validators.required, this.passwordValidate.bind(this.admin_form.controls['password'])]);
    this.data_modal.show();
  }

  openEditAdminModal(){
    let admins:any[]=[];
    admins=this._utilerias.getCheked(this.admins);
    this.admin_form.get('confirm_password').clearValidators();
    this.admin_form.get('password').clearValidators();
    this.data_modal_flag="editar";
    if(admins.length>0){
      this.admin_form.get('_id').setValue(admins[0]._id);
      this.admin_form.get('nombre').setValue(admins[0].nombre);
      this.admin_form.get('email').setValue(admins[0].email);
      this.data_modal.show();
    }else if(this.selected_admin._id){
      this.admin_form.get('_id').setValue(this.selected_admin._id);
      this.admin_form.get('nombre').setValue(this.selected_admin.nombre);
      this.admin_form.get('email').setValue(this.selected_admin.email);
      this.data_modal.show();
    }

  }

  editAdmin(){
    let editAdmin=this.admin_form.value;
    delete editAdmin.password;
    delete editAdmin.confirm_password;
    this._adminsService.editAdmin(editAdmin).subscribe(data=>{
      console.log(data);
      this.data_modal.hide()
      this.success_modal.show();
      this.update();
      this.admin_form.reset()
    },err=>{
      this.danger_modal.show();
    });
  }

  saveDataModal(){
    if(this.data_modal_flag=='nuevo'){
      this.addAdmin();
    }else if(this.data_modal_flag=='editar'){
      this.editAdmin();
    }
  }

  addAdmin(){
    let newUser=this.admin_form.value;
    delete newUser.confirm_password;
    this._adminsService.addAdmin(newUser).subscribe(data=>{
      this.data_modal.hide();
      this.success_modal.show();
      this.update();
      this.admin_form.reset();
    },err=>{
      this.data_modal.show();
    })
  }

  confirmUsersDelete(){
    this.array_selected=[];
    for (let usuario of this.admins) {
      if (usuario.check)
        this.array_selected.push({_id: usuario._id, show: usuario.nombre})
    }
    if(this.array_selected.length==0){
      if(this.selected_admin._id) {
        this.array_selected.push({_id: this.selected_admin._id, show: this.selected_admin.nombre})
        this.modal_sure_delete.openModal();
      }
    }else{
      this.modal_sure_delete.openModal();
    }
  }


  async deleteAdmin(delete_users:any){
    this.modal_sure_delete.closeModal();
    this.array_deleted=[];
    this.array_not_deleted=[];
    for(let check of delete_users){
      let admin_deleted={
        _id:check._id,
        show:check.show,
        deleted:await this._adminsService.deleteAdmin(check._id).toPromise() ? true:false
    };
      if(admin_deleted.deleted)
        this.array_deleted.push(admin_deleted);
      else
        this.array_not_deleted.push(admin_deleted);
    }
    this.modal_delete_array.openModal();
    this.update()
  }


}
