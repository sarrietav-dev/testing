import { HttpStatusCode } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';

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

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('CRUD Operations', () => {
    it('should return an array of products', (done) => {
      const mockData: Product[] = generateManyProducts();

      service.getAllSimple().subscribe((products) => {
        expect(products.length).toBe(10);
        expect(products).toEqual(mockData);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return product list with taxes', (done) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        },
        {
          ...generateOneProduct(),
          price: 0,
        },
        {
          ...generateOneProduct(),
          price: -400,
        },
      ];

      service.getAll().subscribe((products) => {
        expect(products.length).toBe(mockData.length);
        expect(products[0].taxes).toEqual(19);
        expect(products[1].taxes).toEqual(38);
        expect(products[2].taxes).toEqual(0);
        expect(products[3].taxes).toEqual(0);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should sent query params with limit 10 and offset 3', (done) => {
      const mockData: Product[] = generateManyProducts(3);

      const limit = 10;
      const offset = 3;

      service.getAll(10, 3).subscribe((products) => {
        expect(products.length).toBe(3);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      expect(req.request.params.get('limit')).toEqual(`${limit}`);
      expect(req.request.params.get('offset')).toEqual(`${offset}`);
      req.flush(mockData);
    });

    it('should return a new product', (done) => {
      const mockData: Product = generateOneProduct();

      const productDTO: CreateProductDTO = {
        title: mockData.title,
        description: mockData.description,
        price: mockData.price,
        categoryId: mockData.category.id,
        images: mockData.images,
      };

      service.create(productDTO).subscribe((product) => {
        expect(product).toEqual(mockData);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });

    it('should return a product updated', (done) => {
      const mockData: Product = generateOneProduct();

      const productDTO: UpdateProductDTO = {
        ...mockData,
        title: 'New title',
      };

      service.update(mockData.id, productDTO).subscribe((product) => {
        expect(product).toEqual(mockData);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products/${mockData.id}`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual(productDTO);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockData);
    });

    it('should return a product deleted', (done) => {
      const mockData: Product = generateOneProduct();

      service.delete(mockData.id).subscribe((response) => {
        expect(response).toBeTrue();
        done();
      });

      const url = `${environment.API_URL}/api/v1/products/${mockData.id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(true);
    });

    it('should throw an error when product not found', (done) => {
      const mockData: Product = generateOneProduct();
      const errorMessage = '404 message';

      service.getOne(mockData.id).subscribe({
        error: (err) => {
          expect(err).toEqual('El producto no existe');
          done();
        },
      });

      const url = `${environment.API_URL}/api/v1/products/${mockData.id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(errorMessage, {
        status: HttpStatusCode.NotFound,
        statusText: errorMessage,
      });
    });
  });
});
