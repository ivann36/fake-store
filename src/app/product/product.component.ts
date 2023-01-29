import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product';
import { Router } from "@angular/router"

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  editProduct() {
    throw new Error('Method not implemented.');
  }
  deleteProduct() {
    fetch('https://fakestoreapi.com/products/6', {
      method: "DELETE"
    })
      .then(res => {
        if (res.status == 200) {
          alert('Deleted succesfuly');
          this.router.navigate(['/'])
        }
      });
  }
  product: Product = new Product(0, '', 0, '', '', '');
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.product.id = params['id']);
    fetch(`https://fakestoreapi.com/products/${this.product.id}`)
      .then(res => res.json())
      .then(json => this.product = json);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
