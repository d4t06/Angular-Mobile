import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../_components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../_components/footer/footer.component';
import { GetCategoryService } from '../../services/get-category.service';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './default-layout.component.html',
  providers: [GetCategoryService],
})
export class DefaultLayoutComponent {
  getCategory = inject(GetCategoryService);

  ngOnInit() {
    this.getCategory.getCategories();
  }
}
