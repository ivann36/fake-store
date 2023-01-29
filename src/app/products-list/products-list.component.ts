import { Component } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  defaultLik: string = 'https://fakestoreapi.com/products';
  link: string = '';
  selectedSort: string = 'desc';
  selectedLimit: number = 5;
  categories: string[] = ['test1', 'test2'];
  selectedCategory: string = 'Category';
  products: Product[] = [
    new Product(1, 'test', 21, 'category', 'cool', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool adsfsadfa adsfasdf  sadfsad f', 'img'),
    new Product(2, 'test1', 21, 'category', 'cool', 'img'),
  ];
  ngOnInit() {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => this.categories = json);
    fetch(this.defaultLik)
      .then(res => res.json())
      .then(json => this.products = json)
  }
  addToCart() {
    console.log('added to cart');
  }
  onSortChange(newSort: string) {
    this.selectedSort = newSort;
    fetch(`https://fakestoreapi.com/products/${this.selectedCategory != 'Category' ? '/category/' + this.selectedCategory : ''
      }?sort=${this.selectedSort}&limit=${this.selectedLimit}`)//&limit=${limit}
      .then(res => res.json())
      .then(json => this.products = json);
  }
  onCategoryChange(category: string) {
    this.selectedCategory = category;
    fetch(`https://fakestoreapi.com/products/${this.selectedCategory != 'Category' ? '/category/' + this.selectedCategory : ''
      }?sort=${this.selectedSort}&limit=${this.selectedLimit}`)//)
      .then(res => res.json())
      .then(json => this.products = json);
  }
  onLimitChange(limit: number) {
    this.selectedLimit=limit;
    fetch(`https://fakestoreapi.com/products/${this.selectedCategory != 'Category' ? '/category/' + this.selectedCategory : ''
      }?sort=${this.selectedSort}&limit=${this.selectedLimit}`)//&limit=${limit})
      .then(res => res.json())
      .then(json => this.products = json);
  }
}
