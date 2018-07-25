import { TestBed, inject } from '@angular/core/testing';

import { SeggestionService } from './seggestion.service';

describe('SeggestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeggestionService]
    });
  });

  it('should be created', inject([SeggestionService], (service: SeggestionService) => {
    expect(service).toBeTruthy();
  }));
});
