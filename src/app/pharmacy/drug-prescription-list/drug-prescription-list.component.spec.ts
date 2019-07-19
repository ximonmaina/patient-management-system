import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugPrescriptionListComponent } from './drug-prescription-list.component';

describe('DrugPrescriptionListComponent', () => {
  let component: DrugPrescriptionListComponent;
  let fixture: ComponentFixture<DrugPrescriptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugPrescriptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugPrescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
