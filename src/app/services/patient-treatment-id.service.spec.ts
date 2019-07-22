import { TestBed } from '@angular/core/testing';

import { PatientTreatmentIdService } from './patient-treatment-id.service';

describe('PatientTreatmentIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientTreatmentIdService = TestBed.get(PatientTreatmentIdService);
    expect(service).toBeTruthy();
  });
});
