import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './page/overview/overview.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./service/product.service";
import { ProductDetailsComponent } from './page/product-details/product-details.component';
import { CartComponent } from './page/cart/cart.component';
import { MiniShoppingCartComponent } from './component/mini-shopping-cart/mini-shopping-cart.component';
import {CustomHttpInterceptorService} from "./http-interceptor";
import { CheckoutComponent } from './page/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ProductDetailsComponent,
    MiniShoppingCartComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
