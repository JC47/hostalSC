import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosCamasComponent } from './activos-camas.component';

describe('ActivosCamasComponent', () => {
  let component: ActivosCamasComponent;
  let fixture: ComponentFixture<ActivosCamasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivosCamasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivosCamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
