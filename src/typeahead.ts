import { fromEvent } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const searchInput = document.querySelector('#search-input') as Element;

export const searchObs = fromEvent(searchInput, 'keyup').pipe(
  pluck('target', 'value'),
  // defer the value emition for the specified time(in ms)
  debounceTime(1000),
  // emits only if the observable value is not the same as the last emitted value
  distinctUntilChanged()
);
