import {
  EventEmitter,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CategoryStore } from '../stores/category.store';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

@Injectable()
export class CurrentCategory {
  categoryStore = inject(CategoryStore);
  activeRoute = inject(ActivatedRoute);

  currentCategory = signal<Category | null>(null);
  brandsByCategory = computed(() => this.currentCategory()?.brands || []);
  pricesByCategory = computed(() => this.currentCategory()?.price_ranges || []);

  loading = this.categoryStore.loading;

  activeRouteSub: Subscription;
  routeParams: Record<string, string> = {};

  constructor() {
    this.activeRouteSub = this.categoryStore.finishEmitter
      .pipe(switchMap(() => this.activeRoute.params))
      .subscribe((params) => {
        this.routeParams = params;
        this.currentCategory.set(
          this.categoryStore.categories.find(
            (c) => c.id === +params['categoryId']
          ) || null
        );
      });
  }

  ngOnDestroy() {
    this.activeRouteSub.unsubscribe();
  }
}
