import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, CartItem } from '../types/product.type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public shoppingCartState$: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient) { }

  public async getProducts(): Promise<Array<Product>> {
    return await this.http.get<Array<Product>>('http://localhost:8080/api/products').toPromise();
  }

  public async getProduct(productId: string): Promise<Product> {
    return await this.http.get<Product>('http://localhost:8080/api/product/' + productId).toPromise();
  }

  public async getShoppingCart(): Promise<Array<CartItem>> {
    return await this.http.get<Array<CartItem>>('http://localhost:8080/api/shopping-cart').toPromise();
  }

  public async addProductToShoppingCart(product: Product): Promise<void> {
    await this.http.post('http://localhost:8080/api/shopping-cart', product, { responseType: 'text' }).toPromise();
    this.shoppingCartState$.next();
  }

  async increaseShoppingCartItem(cartItemID): Promise<void>{
    await this.http.post('http://localhost:8080/api/increase-shopping-cart', cartItemID, { responseType: 'text' }).toPromise();
    this.shoppingCartState$.next();
  }

  async decreaseShoppingCartItem(cartItemID): Promise<void>{
    await this.http.post('http://localhost:8080/api/decrease-shopping-cart', cartItemID, { responseType: 'text' }).toPromise();
    this.shoppingCartState$.next();
  }

  async submit(user): Promise<void>{
    await this.http.post('http://localhost:8080/api/submit', user, { responseType: 'text' }).toPromise();
    this.shoppingCartState$.next();
  }  
}


