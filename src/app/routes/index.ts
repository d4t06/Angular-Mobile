import { CartPageComponent } from '../pages/cart/cart.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { ProductComponent } from '../pages/product/product.component';
import { RegisterComponent } from '../pages/register/register.component';

type Route = {
  path: string;
  title: string;
  page: any;
  layout?: '' | 'auth' | 'dashboard';
};

interface PrivateRoute extends Route {
  role?: 'USER' | 'ADMIN';
}

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
    path: ':categoryId',
    title: 'Product',
    page: ProductComponent,
  },
  {
    path: 'product/:productAscii',
    title: 'Product Detail',
    page: ProductDetailComponent,
  },
];

export const privateRoutes: PrivateRoute[] = [
  {
    path: 'cart',
    title: 'Cart',
    page: CartPageComponent,
  },
];
