import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/types/product.type';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  email: string = '';
  vorname: string = '';
  nachname: string = '';
  regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  user: User = {
    vorname: '',
    nachname: '',
    email: ''
  }

  invalid: boolean;

  ngOnInit() {
  }

  async submit() {
    if (this.email == '' || this.nachname == '' || this.email == '' || this.regex.test(this.email)) {
      console.log(this.email);
      console.log(this.nachname);
      console.log(this.vorname);


      this.invalid = true
    }
    else {
      console.log(this.email);
      console.log(this.nachname);
      console.log(this.vorname);

      this.user.vorname = this.vorname;
      this.user.nachname = this.nachname;
      this.user.email = this.email;

      await this.productService.submit(this.user);
      this.router.navigate(['/overview']);
    }

  }

  changedVorname(ev) {
    this.vorname = ev.target.value;
  }

  changedNachname(ev) {
    this.nachname = ev.target.value;
  }

  changedEmail(ev) {
    this.email = ev.target.value;
  }

  openHome(){
    this.router.navigate(['/overview']);
    }

}
