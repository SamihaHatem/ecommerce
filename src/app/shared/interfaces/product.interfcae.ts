import { categoryI } from "./category.interface";
import { subCategoryI } from "./subcategory.interface";

export interface productI {
    sold: number,
    images: any,
    subcategory: subCategoryI[],
    ratingsQuantity: number,
    _id: string,
    title: string,
    slug: string,
    description: string,
    quantity: number,
    price: number,
    availableColors: any,
    imageCover: string,
    category: categoryI,
    brand: any,
    ratingsAverage: number,
    createdAt: Date,
    updatedAt: Date,
    id: string
} 