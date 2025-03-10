import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { categoryI } from '../../../shared/interfaces/category.interface';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, LoadingComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, OnDestroy {

  isLoading:boolean = true
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
    this.isLoading = true

    this.getAllCategoriesSubscription = this.ecommerceService.getAllCategories().subscribe((response: any) => {
      this.categoriesList = response.data;
      console.log(this.categoriesList)
      this.isLoading = false
    }, (err: any) => {
      console.log(err)
      this.isLoading = false

    })
  }


  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscription.unsubscribe();
  }

}
