import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { productI } from '../../../shared/interfaces/product.interfcae';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import { CartService } from '../../../shared/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [LoadingComponent, CarouselModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  constructor(private cartServices: CartService, private wishlistServices: WishlistService) { }

  isLoading: boolean = true;
  productsList: productI[] = []
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

  selectedProduct!: productI
  isModalOpen: boolean = false

  openModal(product: productI) {
    this.selectedProduct = product;
    console.log(product)
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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

  removeFromWishlist(id: string) {
    this.isLoading = true;
    this.wishlistServices.removeProductFromWishlist(id).subscribe((response: any) => {
      console.log(response)
      Swal.fire({
        title: response.message,
        icon: 'success'
      }).then(() => {
        this.isModalOpen = false
        this.getwishlist()
      })
      this.isLoading = false
    }, (err: any) => {
      console.log(err)
      this.isLoading = false

    })
  }

  getwishlist() {
    this.isLoading = true;
    this.productsList = [];
    this.wishlistServices.getUserWishlist().subscribe((response: any) => {
      console.log(response)
      this.productsList = response.data
      this.isLoading = false;

    }, (err: any) => {
      console.log(err)
      this.isLoading = false;

    })
  }


  ngOnInit(): void {
    this.getwishlist()
  }


}
