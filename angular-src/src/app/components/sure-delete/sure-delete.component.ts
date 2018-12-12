import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UtileriaService} from "../../services/utileria.service";

@Component({
  selector: 'sure-delete',
  templateUrl: './sure-delete.component.html',
  styleUrls: ['./sure-delete.component.css']
})
export class SureDeleteComponent implements OnInit {

  @Input() arrayDelete:any[];
  @Input() itemTypeSingular:string;
  @Input() itemTypePlural:string;

  @ViewChild('modal')modal:any;
  @Output() acceptDelete = new EventEmitter();

  constructor(public util:UtileriaService) {
    console.log(this.arrayDelete)
  }

  ngOnInit() {
  }

  openModal(){
    this.modal.show();
  }

  closeModal(){
    this.modal.hide();
  }

  aceptEvent(){
    this.acceptDelete.emit(this.arrayDelete);
    this.closeModal();
  }

}
