import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTreatmentComponent } from './main-treatment.component';

describe('MainTreatmentComponent', () => {
  let component: MainTreatmentComponent;
  let fixture: ComponentFixture<MainTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
