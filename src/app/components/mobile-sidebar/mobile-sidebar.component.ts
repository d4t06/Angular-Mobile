import { ButtonComponent } from '@/app/share/components/button/button.component';
import { SkeletonComponent } from '@/app/share/components/skeleton/skeleton.component';
import { newArray } from '@/app/share/utils/appHelper';
import { AuthStore } from '@/app/stores/auth.store';
import { CategoryStore } from '@/app/stores/category.store';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
   standalone: true,
   selector: 'app-mobile-sidebar',
   imports: [SkeletonComponent, ButtonComponent, RouterLink],
   templateUrl: './mobile-sidebar.component.html',
})
export class MobileSidebarComponent {
   categoryStore = inject(CategoryStore);
   authStore = inject(AuthStore);

   isOpen = false;

   router = inject(Router);

   open() {
      this.isOpen = true;
   }

   close() {
      this.isOpen = false;
   }

   handleNavigate(href: string) {
      this.close();
      this.router.navigateByUrl(href);
   }

   newArray = newArray;
}
