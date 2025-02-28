import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productI } from '../../../shared/interfaces/product.interfcae';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)
  private readonly ecommerceService = inject(EcommerceService)
  productID!: string
  selectedProduct!: productI
  productOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    dotsData: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor() { }

  getProductDetails(id: string) {

    this.isLoading = true;

    this.ecommerceService.getProductByID(id).subscribe((response: any) => {
      console.log(response)
      this.selectedProduct = response.data
      this.isLoading = false;

    }, (err: any) => {
      console.log(err)
      this.isLoading = false;

    })
  }

  isLoading: boolean = true
  addToCart(_id: string) {
    this.isLoading = true;
    this.cartService.addProductToCart(_id).subscribe((response: any) => {
      console.log(response)
      this.isLoading = false;

      Swal.fire({
        title: 'Done',
        icon: 'success'
      }).then(() => {
      })
    }, (err: any) => {
      console.log(err)
      this.isLoading = false;

    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.productID = params['_id'])
    console.log(this.productID)
    this.getProductDetails(this.productID)
  }
}
