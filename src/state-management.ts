import { BehaviorSubject, fromEvent, of } from 'rxjs';
import { pluck, tap, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

type User = {
  id?: string;
  name?: string;
  email?: string;
};

export const userSubject = new BehaviorSubject<User>({});
const selectList = document.querySelector('#select-list') as HTMLElement;

fromEvent(selectList, 'change').pipe(
  tap(ev => console.log('change event emitted')),
  pluck('target', 'value'),
  switchMap(endpoint => ajax(`http://localhost:3300${endpoint}`)),
  map(result => {
    const tempUser: User = {
      id: result.response.id,
      name: result.response.name,
      email: result.response.email
    };
    return tempUser;
  })
).subscribe(user => {
  userSubject.next(user);
});
