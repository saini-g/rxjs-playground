import { BehaviorSubject, interval } from 'rxjs';
import { take } from 'rxjs/operators';

export const numberSubject = new BehaviorSubject<number>(0);
const intervalObs = interval(3000).pipe(take(10));
intervalObs.subscribe(numberSubject);
