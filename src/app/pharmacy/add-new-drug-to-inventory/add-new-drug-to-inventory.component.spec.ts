import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDrugToInventoryComponent } from './add-new-drug-to-inventory.component';

describe('AddNewDrugToInventoryComponent', () => {
  let component: AddNewDrugToInventoryComponent;
  let fixture: ComponentFixture<AddNewDrugToInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDrugToInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDrugToInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
