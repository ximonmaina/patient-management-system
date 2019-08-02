import { TestBed, async, inject } from '@angular/core/testing';

import { LabtechGuard } from './labtech.guard';

describe('LabtechGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabtechGuard]
    });
  });

  it('should ...', inject([LabtechGuard], (guard: LabtechGuard) => {
    expect(guard).toBeTruthy();
  }));
});
