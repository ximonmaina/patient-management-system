import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientTriageComponent } from './add-patient-triage.component';

describe('AddPatientTriageComponent', () => {
  let component: AddPatientTriageComponent;
  let fixture: ComponentFixture<AddPatientTriageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPatientTriageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientTriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
