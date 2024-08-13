import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { ProductComponent } from '../pages/product/product.component';
import { RegisterComponent } from '../pages/register/register.component';

export const publicRoutes: {
  path: string;
  title: string;
  page: any;
  layout?: '' | 'auth' | 'dashboard';
}[] = [
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
