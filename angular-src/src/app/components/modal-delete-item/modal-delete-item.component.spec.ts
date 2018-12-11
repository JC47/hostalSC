import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteItemComponent } from './modal-delete-item.component';

describe('ModalDeleteItemComponent', () => {
  let component: ModalDeleteItemComponent;
  let fixture: ComponentFixture<ModalDeleteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
