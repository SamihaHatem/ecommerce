import { Component, inject, OnInit } from '@angular/core';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { cartI } from '../../../shared/interfaces/cart.interface';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [LoadingComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly ecommerceService = inject(EcommerceService)
  private readonly cartServices = inject(CartService)
  cartDetails!: cartI
  isLoading: boolean = true;

  constructor() { }

  getCurrentUserCart() {
    this.isLoading = true
    this.cartServices.getCurrentUserCart().subscribe((response: cartI) => {
      this.cartDetails = response
      console.log(response)
      this.isLoading = false;
    }, (err: any) => {
      console.log(err)
      this.isLoading = false
    })
  }

  updateProductQuantity(id: string, newCount: number) {
    this.isLoading = true
    this.cartServices.updateCartProductQuantity(id, { count: newCount }).subscribe((response: any) => {
      console.log(response)
      this.cartDetails = response
      this.isLoading = false
    }, (err: any) => {
      console.log(err)
      this.isLoading = false
    })
  }

  removeProduct(id: string) {
    this.isLoading = true
    this.cartServices.removeCartProduct(id).subscribe((response: any) => {
      console.log(response)
      this.cartDetails = response
      this.isLoading = false

    }, (err: any) => {
      console.log(err)
      this.isLoading = false
    })
  }

  clearCart() {
    this.isLoading = true
    this.cartServices.clearCart().subscribe((response: any) => {
      console.log(response)
      this.isLoading = false

      if (response.message == 'success') {
        this.cartDetails = { numOfCartItems: 0 }
      }
    }, (err: any) => {
      console.log(err)
      this.isLoading = false

    })
  }

  ngOnInit(): void {
    this.getCurrentUserCart()
  }
}
