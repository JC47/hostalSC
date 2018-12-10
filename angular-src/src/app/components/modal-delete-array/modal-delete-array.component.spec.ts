import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteArrayComponent } from './modal-delete-array.component';

describe('ModalDeleteArrayComponent', () => {
  let component: ModalDeleteArrayComponent;
  let fixture: ComponentFixture<ModalDeleteArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
