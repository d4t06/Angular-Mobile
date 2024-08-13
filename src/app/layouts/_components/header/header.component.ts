import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth.store';
import { Search } from './_components/search.component';
import { CategoryStore } from '../../../stores/category.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, Search],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  auth = inject(AuthStore);
  categoryStore = inject(CategoryStore);
}
