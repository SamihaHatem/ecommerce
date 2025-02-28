import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { brandsI } from '../../../shared/interfaces/brands.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit, OnDestroy {

  constructor(private ecommerceService: EcommerceService) { }

  brandsList: brandsI[] = []
  getAllBrandsSub: Subscription = new Subscription()
  getAllBrands() {
    this.getAllBrandsSub = this.ecommerceService.getAllBrands().subscribe((response: any) => {
      this.brandsList = response.data;
    }, (err: any) => {
      console.log(err)
    })
  }

  ngOnInit(): void {
    this.getAllBrands();
  }

  ngOnDestroy(): void {
    this.getAllBrandsSub.unsubscribe();
  }
}
