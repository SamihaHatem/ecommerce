import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { categoryI } from '../../../shared/interfaces/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { productI } from '../../../shared/interfaces/product.interfcae';
import { brandsI } from '../../../shared/interfaces/brands.interface';
import { CartService } from '../../../shared/services/cart/cart.service';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private ecommerceService: EcommerceService, private cartServices: CartService, private wishlistServices: WishlistService) { }

  categoriesList: categoryI[] = []
  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
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
  getAllCategoriesSubscription: Subscription = new Subscription()
  getAllCategories() {
    this.getAllCategoriesSubscription = this.ecommerceService.getAllCategories().subscribe((response: any) => {
      this.categoriesList = response.data;
    }, (err: any) => {
      console.log(err)
    })
  }

  getAllProductsSubscription: Subscription = new Subscription()
  productsList: productI[] = []
  getProducts() {
    this.getAllProductsSubscription = this.ecommerceService.getAllProducts().subscribe((response: any) => {
      this.productsList = response.data
    }, (err: any) => {
      console.log(err)
    })
  }

  brandsList: brandsI[] = []
  getAllBrandsSub: Subscription = new Subscription()
  getAllBrands() {
    this.getAllBrandsSub = this.ecommerceService.getAllBrands().subscribe((response: any) => {
      this.brandsList = response.data;
    }, (err: any) => {
      console.log(err)
    })
  }

  isModalOpen: boolean = false;
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

  openModal(product: productI) {
    this.selectedProduct = product;
    console.log(product)
    this.isModalOpen = true;
  }


  isLoading: boolean = false;
  addToCart(_id: string) {
    this.isLoading = true;

    this.cartServices.addProductToCart(_id).subscribe((response: any) => {
      console.log(response)
      this.isLoading = false;

      Swal.fire({
        title: 'Done',
        icon: 'success'
      }).then(() => {
        this.isModalOpen = false
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
      this.wishList = response.data.map((p: any) => p._id )
      console.log(this.wishList)
    }, (err: any) => {
      console.log(err)
    })
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getProducts();
    this.getAllBrands();
    this.getWishlist();
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscription.unsubscribe();
    this.getAllProductsSubscription.unsubscribe();
    this.getAllBrandsSub.unsubscribe();
  }
}
