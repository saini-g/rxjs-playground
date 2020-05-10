import { from, fromEvent, interval } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';

const obs = from([1, 2, 3, 4, 5]);

// modify each emitted value similar to js Array.map
// rxjs also has reduce and filter similar to normal Array methods
export const doubled = obs.pipe(
  map(val => val * 2)
);

// similar to reduce, but maintains all prev context values
export const scanObs = obs.pipe(
  scan((result, current, index) => result + current, 0)
);

// switchMap - converts 1 observable into another
// VERY IMP: auto destroys previous observable instances
const switchStartBtn = document.querySelector('#switch-start') as Element;
const clickObs = fromEvent(switchStartBtn, 'click');
export const switchedObs = clickObs.pipe(
  switchMap(ev => interval(1000))
);
