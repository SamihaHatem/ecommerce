import { brandsI } from "./brands.interface"
import { categoryI } from "./category.interface"
import { subCategoryI } from "./subcategory.interface"

export interface cartI {
    status?: string,
    numOfCartItems?: number,
    cartId?: string,
    data?: {
        _id: string,
        cartOwner: string,
        products:
        {
            count: number,
            _id: string,
            product: {
                subcategory: subCategoryI[],
                _id: string,
                title: string,
                quantity: number,
                imageCover: string,
                category: categoryI,
                brand: brandsI,
                ratingsAverage: number,
                id: string
            },
            price: number
        }[],
        createdAt: Date,
        updatedAt: Date,
        totalCartPrice: number
    }
}
