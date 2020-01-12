import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../types/product.type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public products: Array<Product> = new Array<Product>();

  constructor(private productService: ProductService, private router: Router) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

  async productDetails(id: number) {
    await this.router.navigate(['/details/' + id]);
  }
}
