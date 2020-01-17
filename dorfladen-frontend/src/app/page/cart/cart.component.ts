import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product, CartItem } from 'src/app/types/product.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public productCart: Array<CartItem> = new Array<CartItem>();
  public products: Array<Product> = new Array<Product>();

  constructor(private productService: ProductService, private router: Router) { }

  async ngOnInit() {
    this.productCart = await this.productService.getShoppingCart();
    this.productCart.forEach(element => {
      this.products.push(element.product);
    });
  }

  openHome(){
  this.router.navigate(['/overview']);
  }


}
