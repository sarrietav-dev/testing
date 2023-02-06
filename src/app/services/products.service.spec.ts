import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllSimple()', () => {
    it('should return an array of products', (done) => {
      const mockData: Product[] = [
        {
          id: '1',
          title: 'Title 1',
          description: 'Description 1',
          price: 100,
          category: {
            id: 1,
            name: 'Category 1',
          },
          images: [
            'https://picsum.photos/200/300',
            'https://picsum.photos/200/300',
          ],
          taxes: 19,
        },
      ];

      service.getAllSimple().subscribe((products) => {
        expect(products).toEqual(mockData);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
