import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsLabResultsComponent } from './patients-lab-results.component';

describe('PatientsLabResultsComponent', () => {
  let component: PatientsLabResultsComponent;
  let fixture: ComponentFixture<PatientsLabResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsLabResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsLabResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
