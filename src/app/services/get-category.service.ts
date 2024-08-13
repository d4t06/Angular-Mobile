import { inject } from '@angular/core';
import { CategoryStore } from '../stores/category.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

const CAT_URL = environment.apiEndpoint + '/categories';

export class GetCategoryService {
  categoryStore = inject(CategoryStore);

  http = inject(HttpClient);

  getCategories() {
    this.http.get(CAT_URL).subscribe({
      next: (res: any) => {
        const data = res.data as Category[];

        this.categoryStore.storingCategory({
          categories: data,
          loading: false,
        });

        this.categoryStore.notifyFinish();
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
