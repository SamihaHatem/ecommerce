import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' },
        ]
    },
    {
        path: '', component: BlankLayoutComponent, children: [
            { path: 'home', component: HomeComponent, title: 'home' },
            { path: 'cart', component: CartComponent, title: 'cart' },
            { path: 'products', component: ProductsComponent, title: 'products' },
            { path: 'brands', component: BrandsComponent, title: 'brands' },
            { path: 'categories', component: CategoriesComponent, title: 'categories' },
            { path: 'checkout', component: CheckoutComponent, title: 'checkout' },
            { path: '**', component: NotfoundComponent , title:'NotFound' }
        ]
    },
];
