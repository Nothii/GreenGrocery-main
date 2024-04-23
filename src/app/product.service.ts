import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private translate: TranslateService) {
    // Subscribe to language change events
    this.translate.onLangChange.subscribe(() => {
      this.updateProducts();
    });

    // Initial data load
    this.updateProducts();
  }

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  private updateProducts() {
    const productKeys = [
      'products.product1.name',
      'products.product1.description',
      'products.product2.name',
      'products.product2.description',
      'products.product3.name',
      'products.product3.description',
      'products.product4.name',
      'products.product4.description',
    ];
    // Logic to fetch products from an API or other data source
    this.translate.get(productKeys).subscribe(translations => {
      const products: Product[] = [
        {
          id: 1, name: translations['products.product1.name'], description: translations['products.product1.description'], price: 10, imgSrc: 'assets/img/products/apple/starking-apple.png',
          variants: [
            { id: 1, name: 'Variant 1', images: "assets/img/products/apple/starking-apple.png" },
            { id: 2, name: 'Variant 2', images: "assets/img/products/apple/golden-apple.png" },
            { id: 3, name: 'Variant 3', images: "assets/img/products/apple/granny-smith-apple.png" }
          ]
        },
        {
          id: 2, name: translations['products.product2.name'], description: translations['products.product2.description'], price: 20, imgSrc: 'https://example.com/product2.jpg',
          variants: []
        },
        {
          id: 3, name: translations['products.product3.name'], description: translations['products.product3.description'], price: 15, imgSrc: 'https://example.com/product3.jpg',
          variants: []
        },
        {
          id: 4, name: translations['products.product4.name'], description: translations['products.product4.description'], price: 12.5, imgSrc: 'https://example.com/product4.jpg',
          variants: []
        },
      ];
      this.productsSubject.next(products);
    });
  }
}
