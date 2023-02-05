import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService;

  it('should return the value from the value service', () => {
    const valueService = new ValueService();
    service = new MasterService(valueService);

    expect(service.getValue()).toBe('A value');
  });

  it('should return a value using a fake service', () => {
    const fakeValueService = {
      getValue: () => 'A fake value',
    };

    service = new MasterService(fakeValueService as ValueService);

    expect(service.getValue()).toBe('A fake value');
  });

  it('should call getValue from ValueService', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);

    valueServiceSpy.getValue.and.returnValue('A value from spy');

    service = new MasterService(valueServiceSpy);

    expect(valueServiceSpy.getValue()).toBe('A value from spy');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
