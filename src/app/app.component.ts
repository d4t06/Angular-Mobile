import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RefreshToken } from './services/refresh-token.service';
import { AuthStore } from './stores/auth.store';
import { CategoryStore } from './stores/category.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DefaultLayoutComponent,
    RouterOutlet,
    AuthLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [RefreshToken, CategoryStore],
})
export class AppComponent {
  title = 'angular-2';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private refresh: RefreshToken,
  ) {}

  layout: '' | 'default' | 'auth' | 'dashboard' = '';

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.layout =
          this.activatedRoute.firstChild?.snapshot.data['layout'] || 'default';
      }
    });

    this.refresh.refresh();
  }
}
