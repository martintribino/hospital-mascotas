import { TestBed } from '@angular/core/testing';

import { VeterinarioService } from './veterinario.service';

describe('VeterinarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VeterinarioService = TestBed.get(VeterinarioService);
    expect(service).toBeTruthy();
  });
});
