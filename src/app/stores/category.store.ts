import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

type State = {
  categories: Category[];
  loading: boolean;
};

@Injectable()
export class CategoryStore {
  categories: Category[] = [];
  loadingSubj = new BehaviorSubject(true);
  loadingSubj2 = new Subject()

  storingCategory(payload: Partial<State>) {
    Object.assign(this, payload);
  }
}
