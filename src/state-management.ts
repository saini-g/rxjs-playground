import { BehaviorSubject, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { userPipe } from '../services/user';

type User = {
  id?: string;
  name?: string;
  email?: string;
};

export const userSubject = new BehaviorSubject<User>({});
const selectList = document.querySelector('#select-list') as HTMLElement;

if (selectList) {
  fromEvent(selectList, 'change').pipe(
    pluck('target', 'value'),
    userPipe
  ).subscribe(user => {
    userSubject.next(user);
  });
}
