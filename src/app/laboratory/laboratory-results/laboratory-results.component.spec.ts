import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryResultsComponent } from './laboratory-results.component';

describe('LaboratoryResultsComponent', () => {
  let component: LaboratoryResultsComponent;
  let fixture: ComponentFixture<LaboratoryResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
