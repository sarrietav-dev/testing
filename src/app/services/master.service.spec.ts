import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [MasterService, { provide: ValueService, useValue: spy }],
    });

    service = TestBed.inject(MasterService);
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    valueService.getValue.and.returnValue('A value from spy');
  });

  it('should call getValue from ValueService', () => {

    expect(valueService.getValue()).toBe('A value from spy');
    expect(valueService.getValue).toHaveBeenCalled();
    expect(valueService.getValue).toHaveBeenCalledTimes(1);
  });
});
