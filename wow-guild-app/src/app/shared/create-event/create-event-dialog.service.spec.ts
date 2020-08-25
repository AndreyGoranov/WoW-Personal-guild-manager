import { TestBed } from '@angular/core/testing';

import { CreateEventDialogService } from './create-event-dialog.service';

describe('CreateEventDialogService', () => {
  let service: CreateEventDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
