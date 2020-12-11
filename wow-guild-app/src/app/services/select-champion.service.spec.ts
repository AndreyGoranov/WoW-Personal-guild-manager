import { TestBed } from '@angular/core/testing';

import { SelectChampionService } from './select-champion.service';

describe('SelectChampionService', () => {
  let service: SelectChampionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectChampionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
