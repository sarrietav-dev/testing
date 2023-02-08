import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, TokenService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Login tests', () => {
    it('shoud return a token', (done) => {
      const email = 'test@test.com';
      const password = 'testpssw';
      const access_token = 'token';

      service.login(email, password).subscribe((token) => {
        expect(token.access_token).toBe(access_token);
        done();
      });

      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual({ email, password });
      req.flush({ access_token });
    });

    it('should save the token', (done) => {
      const email = 'test@test.com';
      const password = 'testpssw';
      const access_token = 'token';

      spyOn(tokenService, 'saveToken').and.callThrough();

      service.login(email, password).subscribe(() => {
        expect(tokenService.saveToken).toHaveBeenCalled();
        expect(tokenService.saveToken).toHaveBeenCalledWith(access_token);
        done();
      });

      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual({ email, password });
      req.flush({ access_token });
    });
  });
});
