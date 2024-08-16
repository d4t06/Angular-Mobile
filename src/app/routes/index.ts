import { CheckOutPageComponent } from '../pages/check-out/check-out.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { ProductComponent } from '../pages/product/product.component';
import { RegisterComponent } from '../pages/register/register.component';
import { SearchComponent } from '../pages/search/search.component';

type Route = {
   path: string;
   title: string;
   page: any;
   layout?: Layout | '';
};

export const publicRoutes: Route[] = [
   {
      path: '',
      title: 'Home',
      page: HomeComponent,
   },
   {
      path: 'login',
      title: '',
      page: LoginComponent,
      layout: 'auth',
   },
   {
      path: 'register',
      title: '',
      page: RegisterComponent,
      layout: 'auth',
   },
   {
      path: 'check-out',
      title: 'Check Out',
      page: CheckOutPageComponent,
      layout: 'check-out',
   },
   {
      path: ':categoryId',
      title: 'Product',
      page: ProductComponent,
   },
   {
      path: 'product/:productAscii',
      title: 'Product Detail',
      page: ProductDetailComponent,
   },
   {
      path: 'search/:searchKey',
      title: 'Product Search Result',
      page: SearchComponent,
   },
];

// export const privateRoutes: PrivateRoute[] = [
//   {
//     path: 'cart',
//     title: 'Cart',
//     page: CartPageComponent,
//   },
// ];
