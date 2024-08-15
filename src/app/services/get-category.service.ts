import { inject, isDevMode } from '@angular/core';
import { CategoryStore } from '../stores/category.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { delay } from 'rxjs';

const CAT_URL = environment.apiEndpoint + '/categories';

export class GetCategoryService {
  categoryStore = inject(CategoryStore);

  http = inject(HttpClient);

  getCategories() {
    // this.categoryStore.loadingSubj.next(false);

    this.http
      .get(CAT_URL)
      .pipe(delay(isDevMode() ? 600 : 0))
      .subscribe({
        next: (res: any) => {
          const data = res.data as Category[];

          this.categoryStore.storingCategory({
            categories: data,
            loading: false,
          });

          this.categoryStore.loadingSubj.next(false);
        },
        error: (err) => {
          console.log(err);
          this.categoryStore.storingCategory({
            loading: false,
          });
        },
      });
  }
}
