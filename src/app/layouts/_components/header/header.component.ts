import { Component, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth.store';
import { Search } from './_components/search.component';
import { CategoryStore } from '../../../stores/category.store';
import { ModalComponent } from '../../../share/components/modal/modal.component';
import { ConfirmModalComponent } from '../../../share/components/modal/confirm-modal.component';
import { LogoutService } from '@/app/services/logout.service';
import { ButtonComponent } from '../../../share/components/button/button.component';
import { MobileSidebarComponent } from '@/app/components/mobile-sidebar/mobile-sidebar.component';

@Component({
   selector: 'app-header',
   standalone: true,
   imports: [
      RouterLink,
      Search,
      ModalComponent,
      ConfirmModalComponent,
      ButtonComponent,
      MobileSidebarComponent,
   ],
   providers: [LogoutService],
   templateUrl: './header.component.html',
})
export class HeaderComponent {
   auth = inject(AuthStore);
   categoryStore = inject(CategoryStore);
   logoutService = inject(LogoutService);

   @ViewChild(ModalComponent, { static: true })
   modalComponent: ModalComponent;

   @ViewChild(MobileSidebarComponent, { static: true })
   sidebarComponent: MobileSidebarComponent;

   openModal() {
      this.modalComponent.open();
   }

   close() {
      this.modalComponent.close();
   }

   openSidebar() {
      this.sidebarComponent.open();
   }

   closeSidebar() {
      this.sidebarComponent.close();
   }

   logout() {
      this.logoutService.logout().add(this.close());
   }
}
