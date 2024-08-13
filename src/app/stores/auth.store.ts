import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

type User = {
  token: string;
  username: string;
  role: string;
};

type State = {
  user: User | null;
  loading: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  state: State = {
    user: null,
    loading: true,
  };

  finishEmitter = new Subject<boolean>();

  notifyFinish() {
    this.finishEmitter.next(false);
  }
  storingAuth(payload: Partial<State>) {
    Object.assign(this.state, payload);
  }
}
