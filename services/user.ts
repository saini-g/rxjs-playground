import { ajax } from 'rxjs/ajax';
import { pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

type User = {
  id?: string;
  name?: string;
  email?: string;
};

export const userPipe = pipe(
  switchMap(endpoint => ajax(`http://localhost:3300${endpoint}`)),
  map(result => {
    const tempUser: User = {
      id: result.response.id,
      name: result.response.name,
      email: result.response.email
    };
    return tempUser;
  })
);
