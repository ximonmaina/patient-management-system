import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugInventoryListComponent } from './drug-inventory-list.component';

describe('DrugInventoryListComponent', () => {
  let component: DrugInventoryListComponent;
  let fixture: ComponentFixture<DrugInventoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugInventoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
