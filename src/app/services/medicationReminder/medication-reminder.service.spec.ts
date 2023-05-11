import { TestBed } from '@angular/core/testing';

import { MedicationReminderService } from './medication-reminder.service';

describe('MedicationReminderService', () => {
  let service: MedicationReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicationReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
