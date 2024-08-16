import { Component, ComponentRef, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RefreshToken } from './services/refresh-token.service';
import { CategoryStore } from './stores/category.store';
import { ModalComponent } from './share/components/modal/modal.component';
import { CheckOutLayoutComponent } from './layouts/check-out/check-out-layout.component';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [
      RouterOutlet,
      DefaultLayoutComponent,
      RouterOutlet,
      AuthLayoutComponent,
      ModalComponent,
      CheckOutLayoutComponent,
   ],
   templateUrl: './app.component.html',
   providers: [RefreshToken, CategoryStore],
})
export class AppComponent {
   title = 'angular-2';

   @ViewChild('modal') modalComp: ModalComponent;

   constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private refresh: RefreshToken
   ) {}

   layout: Layout | '' = '';

   ngOnInit() {
      this.router.events.subscribe(event => {
         if (event instanceof NavigationEnd) {
            this.layout =
               this.activatedRoute.firstChild?.snapshot.data['layout'] || 'default';
         }
      });

      this.refresh.refresh();
   }
}
