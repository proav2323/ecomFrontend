import { TestBed } from '@angular/core/testing';

import { PrismaServiceService } from './prisma-service.service';

describe('PrismaServiceService', () => {
  let service: PrismaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrismaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
