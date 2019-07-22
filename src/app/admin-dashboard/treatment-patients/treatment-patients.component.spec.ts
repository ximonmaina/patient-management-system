import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPatientsComponent } from './treatment-patients.component';

describe('TreatmentPatientsComponent', () => {
  let component: TreatmentPatientsComponent;
  let fixture: ComponentFixture<TreatmentPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
