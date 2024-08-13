import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

type State = {
  categories: Category[];
  loading: boolean;
};

@Injectable()
export class CategoryStore {
  categories: Category[] = [];
  loading = true;

  finishEmitter = new Subject<boolean>();

  notifyFinish() {
    this.finishEmitter.next(false);
  }

  storingCategory(payload: Partial<State>) {
    Object.assign(this, payload);
  }

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(() => {

      console.log('route change');
      

      this.notifyFinish();
    });
  }
}
