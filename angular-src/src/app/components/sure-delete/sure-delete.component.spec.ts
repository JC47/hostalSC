import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SureDeleteComponent } from './sure-delete.component';

describe('SureDeleteComponent', () => {
  let component: SureDeleteComponent;
  let fixture: ComponentFixture<SureDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SureDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SureDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
