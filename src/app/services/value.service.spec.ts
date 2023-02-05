import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for accessing value', () => {
    it('should return the value', () => {
      expect(service.getValue()).toBe('A value');
    });

    it('should change the value', () => {
      service.setValue('New value');
      expect(service.getValue()).toBe('New value');
    });

    it('should return the value from a promise using async', async () => {
      const result = await service.getPromiseValue();
      expect(result).toBe('A value');
    });

    it('should return the value with observable', (done) => {
      service.getObservableValue().subscribe((result) => {
        expect(result).toBe('A value');
        done();
      });
    });
  });
});
