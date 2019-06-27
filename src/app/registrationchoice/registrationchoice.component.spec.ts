import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationchoiceComponent } from './registrationchoice.component';

describe('RegistrationchoiceComponent', () => {
  let component: RegistrationchoiceComponent;
  let fixture: ComponentFixture<RegistrationchoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationchoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationchoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
