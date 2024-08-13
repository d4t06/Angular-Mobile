import { Route } from '@angular/router';
import { publicRoutes } from './routes';

export const routes = publicRoutes.map(
  (r) =>
    ({
      path: r.path,
      component: r.page,
      data: {
        layout: r.layout || 'default',
      },
    } as Route)
);
