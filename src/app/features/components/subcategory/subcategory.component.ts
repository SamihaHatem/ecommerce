import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { subCategoryI } from '../../../shared/interfaces/subcategory.interface';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent implements OnInit, OnDestroy {

  mainCatId: string = ''
  mainCatName: string = ''
  constructor(private ecommerceService: EcommerceService, private route: ActivatedRoute) { }

  getSubCategoriesSubscription: Subscription = new Subscription()
  subCatList: subCategoryI[] = []
  getSubCategories(id: string) {
    this.getSubCategoriesSubscription = this.ecommerceService.getSubCategoriesByCatID(id).subscribe((response: any) => {
      console.log(response)
      this.subCatList = response.data
    }, (err: any) => {
      console.log(err)
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.mainCatId = params._id
      this.mainCatName = params.name
      this.getSubCategories(this.mainCatId)
    })
  }

  ngOnDestroy(): void {
    this.getSubCategoriesSubscription.unsubscribe();
  }
}
