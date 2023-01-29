import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product';
import { Router } from "@angular/router"
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  public product: Product = new Product(0, '', 0, '', '', '');
  private sub: any;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  onSubmit(form: NgForm) {
    if (this.id == 0) {
      fetch('https://fakestoreapi.com/products', {
        method: "POST",
        body: JSON.stringify(
          {
            title: form.value.title,
            price: form.value.price,
            description: form.value.description,
            image: form.value.image,
            category: form.value.category
          }
        )
      })
        .then(res => {
          if (res.status == 200) {
            alert('Created succesfuly!');
            this.router.navigate(['/'])
          }
        });
    } else {
      fetch(`https://fakestoreapi.com/products/${this.id}`, {
        method: "PUT",
        body: JSON.stringify(
          {
            title: form.value.title,
            price: form.value.price,
            description: form.value.description,
            image: form.value.image,
            category: form.value.category
          }
        )
      })
        .then(res => {
          if (res.status == 200) {
            alert('Edited succesfuly!');
            this.router.navigate(['/'])
          }
        });
    }
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    console.log(this.id);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}