import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent,
        children: [
            { path: 'login', loadComponent: () => import('./features/login/login.component').then((c) => c.LoginComponent), title: 'Login' },
            { path: 'register', loadChildren: () => import('./features/register/register.component').then((c) => c.RegisterComponent), title: 'Register' },
        ]
    },
    {
        path: '', component: BlankLayoutComponent, children: [
            { path: 'home', component: HomeComponent, title: 'home' },
            { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent), title: 'cart' },
            { path: 'products', loadComponent: () => import('./features/products/products.component').then((c) => c.ProductsComponent), title: 'products' },
            { path: 'brands', loadComponent: () => import('./features/brands/brands.component').then((c) => c.BrandsComponent), title: 'brands' },
            { path: 'categories', loadComponent: () => import('./features/categories/categories.component').then((c) => c.CategoriesComponent), title: 'categories' },
            { path: 'categories/:name/:_id', loadComponent: () => import('./features/subcategory/subcategory.component').then((c) => c.SubcategoryComponent), title: 'subcategories' },
            { path: 'checkout', loadComponent: () => import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent), title: 'checkout' },
            { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent), title: 'wishlist' },
            { path: '**', loadComponent: () => import('./shared/components/notfound/notfound.component').then((c) => c.NotfoundComponent), title: 'NotFound' }
        ]
    },
];
