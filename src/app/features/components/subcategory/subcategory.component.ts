import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcommerceService } from '../../../shared/services/ecommerce/ecommerce.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { subCategoryI } from '../../../shared/interfaces/subcategory.interface';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [RouterLink, LoadingComponent],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent implements OnInit, OnDestroy {

  isLoading: boolean = true
  mainCatId: string = ''
  mainCatName: string = ''
  constructor(private ecommerceService: EcommerceService, private route: ActivatedRoute) { }

  getSubCategoriesSubscription: Subscription = new Subscription()
  subCatList: subCategoryI[] = []
  getSubCategories(id: string) {
    this.isLoading = true

    this.getSubCategoriesSubscription = this.ecommerceService.getSubCategoriesByCatID(id).subscribe((response: any) => {
      console.log(response)
      this.subCatList = response.data
      this.isLoading = false

    }, (err: any) => {
      console.log(err)
      this.isLoading = false

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
