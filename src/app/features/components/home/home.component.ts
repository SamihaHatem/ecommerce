import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { categoryI } from '../../../shared/interfaces/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { productI } from '../../../shared/interfaces/product.interfcae';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private ecommerceService: EcommerceService) { }

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

  getAllBrands() {
    this.ecommerceService.getAllBrands().subscribe((response: any) => {
      
    }, (err: any) => {

    })
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscription.unsubscribe();
    this.getAllProductsSubscription.unsubscribe();
  }
}
