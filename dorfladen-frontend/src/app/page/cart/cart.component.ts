import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product, CartItem } from 'src/app/types/product.type';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public productCart: Array<CartItem> = new Array<CartItem>();
  public products: Array<Product> = new Array<Product>();
  product: Product;
  totalPrice : number = 0;

  constructor(private productService: ProductService, private router: Router) { }

  async ngOnInit() {
    this.productCart = await this.productService.getShoppingCart();
    this.productCart.forEach(element => {
      this.products.push(element.product);
      if(element.product.specialOffer.toString() != ""){
        this.totalPrice = this.totalPrice + element.product.specialOffer * element.amount;
        console.log(element.product.specialOffer);
        console.log(this.totalPrice);
      }
      else{
        this.totalPrice = this.totalPrice + element.product.normalPrice * element.amount;
        console.log(this.totalPrice);
      }
      console.log("here");
      console.log(this.totalPrice);
      
    });
  }

  openHome(){
  this.router.navigate(['/overview']);
  }

  async increaseAmount(cartItemId){
    this.product = await this.productService.getProduct(cartItemId);
    await this.productService.increaseShoppingCartItem(this.product);
    window.location.reload();
  }

  async decreaseAmount(cartItemId){
    this.product = await this.productService.getProduct(cartItemId);
    await this.productService.decreaseShoppingCartItem(this.product);
    window.location.reload();
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }

}
