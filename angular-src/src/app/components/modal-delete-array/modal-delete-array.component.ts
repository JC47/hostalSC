import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'modal-delete-array',
  templateUrl: './modal-delete-array.component.html',
  styleUrls: ['./modal-delete-array.component.css']
})
export class ModalDeleteArrayComponent implements OnInit {

  @ViewChild('modal') modal:any;
  @Input() deletedArray:any;
  @Input() notDeletedArray:any;
  @Input() itemType:string;

  @Output() close=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onCloseModal(){
    this.close.emit();
  }

  openModal(){
    this.modal.show();
  }

  closeModal(){
    this.modal.hide();
  }



}
