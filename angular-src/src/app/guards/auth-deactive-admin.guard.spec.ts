import { TestBed, async, inject } from '@angular/core/testing';

import { AuthDeactiveAdminGuard } from './auth-deactive-admin.guard';

describe('AuthDeactiveAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDeactiveAdminGuard]
    });
  });

  it('should ...', inject([AuthDeactiveAdminGuard], (guard: AuthDeactiveAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
