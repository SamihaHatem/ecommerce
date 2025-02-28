import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { brandsI } from '../../../shared/interfaces/brands.interface';
import { Subscription } from 'rxjs';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit, OnDestroy {

  constructor(private ecommerceService: EcommerceService) { }
  isLoading:boolean = true
  brandsList: brandsI[] = []
  getAllBrandsSub: Subscription = new Subscription()
  getAllBrands() {
    this.getAllBrandsSub = this.ecommerceService.getAllBrands().subscribe((response: any) => {
      this.brandsList = response.data;
      this.isLoading = false;
    }, (err: any) => {
      console.log(err)
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
    this.getAllBrands();
  }

  ngOnDestroy(): void {
    this.getAllBrandsSub.unsubscribe();
  }
}
