import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal-delete-item',
  templateUrl: './modal-delete-item.component.html',
  styleUrls: ['./modal-delete-item.component.css']
})
export class ModalDeleteItemComponent implements OnInit {

  @Input() itemType:string;
  @Input() itemName:string;
  @ViewChild('moda') modal:any;

  constructor() { }

  ngOnInit() {
  }

  openModal(){
    this.modal.show();
  }

  closeModal(){
    this.modal.hide();
  }

}
