import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { productI } from '../../../shared/interfaces/product.interfcae';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import Swal from 'sweetalert2';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, RouterLink, LoadingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {


  constructor(private ecommerceService: EcommerceService, private cartServices: CartService, private wishlistServices: WishlistService) { }

  isModalOpen: boolean = false;
  isLoading: boolean = true
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
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getAllProductsSubscription: Subscription = new Subscription()
  productsList: productI[] = []
  getProducts() {
    this.isLoading = true
    this.getAllProductsSubscription = this.ecommerceService.getAllProducts().subscribe((response: any) => {
      this.productsList = response.data
      this.isLoading = false
    }, (err: any) => {
      console.log(err)
      this.isLoading = false

    })
  }

  openModal(product: productI) {
    this.selectedProduct = product;
    console.log(product)
    this.isModalOpen = true;
  }

  addToCart(_id: string) {
    this.isLoading = true;
    this.cartServices.addProductToCart(_id).subscribe((response: any) => {
      console.log(response)
      Swal.fire({
        title: 'Done',
        icon: 'success'
      }).then(() => {
        this.isModalOpen = false
        this.isLoading = false;

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
        this.isModalOpen = false
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
        this.isModalOpen = false
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
    this.getProducts();
    this.getWishlist();
  }

  ngOnDestroy(): void {
    this.getAllProductsSubscription.unsubscribe();
  }

}
