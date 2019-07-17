import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryRequestsComponent } from './laboratory-requests.component';

describe('LaboratoryRequestsComponent', () => {
  let component: LaboratoryRequestsComponent;
  let fixture: ComponentFixture<LaboratoryRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
