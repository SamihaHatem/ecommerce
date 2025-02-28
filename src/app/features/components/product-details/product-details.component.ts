import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productI } from '../../../shared/interfaces/product.interfcae';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import Swal from 'sweetalert2';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, LoadingComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)
  private readonly ecommerceService = inject(EcommerceService)
  private readonly wishlistServices = inject(WishlistService)

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

  wishList: string[] = []
  addtowishlist(id: string) {
    this.isLoading = true;
    this.wishlistServices.addProductToWishlist(id).subscribe((response: any) => {
      console.log(response)
      Swal.fire({
        title: response.message,
        icon: 'success'
      }).then(() => {
        this.wishList = response.data
      })
      this.isLoading = false
    }, (err: any) => {
      console.log(err)
      this.isLoading = false

    })
  }

  removeFromWishlist(id: string) {
    this.isLoading = true;
    this.wishlistServices.removeProductFromWishlist(id).subscribe((response: any) => {
      console.log(response)
      Swal.fire({
        title: response.message,
        icon: 'success'
      }).then(() => {
        this.wishList = response.data
      })
      this.isLoading = false
    }, (err: any) => {
      console.log(err)
      this.isLoading = false

    })
  }

  getWishlist() {
    this.wishlistServices.getUserWishlist().subscribe((response: any) => {
      console.log("getUserWishlist: ", response)
      this.wishList = response.data.map((p: any) => p._id)
      console.log(this.wishList)
    }, (err: any) => {
      console.log(err)
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.productID = params['_id'])
    console.log(this.productID)
    this.getProductDetails(this.productID)
    this.getWishlist();
  }
}
