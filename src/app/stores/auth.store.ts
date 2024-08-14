import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type User = {
  token: string;
  username: string;
  role: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  user: User | null = null;
  loading = new BehaviorSubject(true);

  storingAuth(payload: User | null) {
    this.user = payload;
  }
}
