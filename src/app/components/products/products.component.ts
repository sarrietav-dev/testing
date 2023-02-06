import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.getAllProducts();
    console.log(this.products);
  }

  private getAllProducts() {
    this.productsService
      .getAll()
      .subscribe((products) => (this.products = products));
  }
}
