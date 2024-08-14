import { Component, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth.store';
import { Search } from './_components/search.component';
import { CategoryStore } from '../../../stores/category.store';
import { ModalComponent } from '../../../share/components/modal/modal.component';
import { ConfirmModalComponent } from '../../../share/components/modal/confirm-modal.component';
import { LogoutService } from '@/app/services/logout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, Search, ModalComponent, ConfirmModalComponent],
  providers: [LogoutService],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  auth = inject(AuthStore);
  categoryStore = inject(CategoryStore);
  logoutService = inject(LogoutService);

  @ViewChild(ModalComponent, { static: true })
  modalComponent: ModalComponent;

  openModal() {
    this.modalComponent.open();
  }

  close() {
    this.modalComponent.close();
  }

  logout() {
    this.logoutService.logout().add(this.close());
  }
}
