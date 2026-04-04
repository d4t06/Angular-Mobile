import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../_components/header/header.component';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../_components/footer/footer.component';
import { GetCategoryService } from '../../services/get-category.service';
import { filter } from 'rxjs/operators';

@Component({
   selector: 'app-default-layout',
   standalone: true,
   imports: [HeaderComponent, RouterOutlet, FooterComponent],
   templateUrl: './default-layout.component.html',
   providers: [GetCategoryService],
})
export class DefaultLayoutComponent {
   getCategory = inject(GetCategoryService);

   constructor(private router: Router) {}

   ngOnInit() {
      this.getCategory.getCategories();

      this.router.events
         .pipe(
            filter(
               (event: Event): event is NavigationEnd => event instanceof NavigationEnd
            )
         )
         .subscribe(() => {
            window.scrollTo(0, 0);
         });
   }
}
