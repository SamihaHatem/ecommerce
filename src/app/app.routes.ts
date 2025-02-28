import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './features/components/home/home.component';
import { authGuard } from './features/guards/auth/auth.guard';
import { redirectGuard } from './features/guards/redirect/redirect.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent, canActivate: [redirectGuard],
        children: [
            { path: 'login', loadComponent: () => import('./features/components/login/login.component').then((c) => c.LoginComponent), title: 'Login' },
            { path: 'register', loadComponent: () => import('./features/components/register/register.component').then((c) => c.RegisterComponent), title: 'Register' },
        ]
    },
    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: 'home', component: HomeComponent, title: 'home' },
            { path: 'cart', loadComponent: () => import('./features/components/cart/cart.component').then((c) => c.CartComponent), title: 'cart' },
            { path: 'products', loadComponent: () => import('./features/components/products/products.component').then((c) => c.ProductsComponent), title: 'products' },
            { path: 'product/details/:_id', loadComponent: () => import('./features/components/product-details/product-details.component').then((c) => c.ProductDetailsComponent), title: 'Details' },
            { path: 'brands', loadComponent: () => import('./features/components/brands/brands.component').then((c) => c.BrandsComponent), title: 'brands' },
            { path: 'catrgories', loadComponent: () => import('./features/components/categories/categories.component').then((c) => c.CategoriesComponent), title: 'categories' },
            { path: 'categories/:name/:_id', loadComponent: () => import('./features/components/subcategory/subcategory.component').then((c) => c.SubcategoryComponent), title: 'subcategories' },
            { path: 'checkout/:cartID', loadComponent: () => import('./features/components/checkout/checkout.component').then((c) => c.CheckoutComponent), title: 'checkout' },
            { path: 'wishlist', loadComponent: () => import('./features/components/wishlist/wishlist.component').then((c) => c.WishlistComponent), title: 'wishlist' },
            { path: 'allorders', loadComponent: () => import('./features/components/orders/orders.component').then((c) => c.OrdersComponent), title: 'orders' },
            { path: '**', loadComponent: () => import('./shared/components/notfound/notfound.component').then((c) => c.NotfoundComponent), title: 'NotFound' }
        ]
    },
];
