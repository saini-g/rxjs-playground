import { ajax } from 'rxjs/ajax';
import { from, forkJoin, concat } from 'rxjs';

// simple observable to emit each element 1 by 1
export const obs = from([1, 2, 3, 4, 5]);

// single async call
export const singleAsync = ajax('https://jsonplaceholder.typicode.com/users');

// parallel async calls - single result/error emitted
// similar to Promise.all
export const parallelAsync = forkJoin(
  ajax('https://jsonplaceholder.typicode.com/users/1'),
  ajax('https://jsonplaceholder.typicode.com/users/2')
);

// sequential async calls - one result/error emitted for each async call in sequence
// if one fails then others are not affected
export const sequentialAsync = concat(
  ajax('https://jsonplaceholder.typicode.com/users/1'),
  ajax('https://jsonplaceholder.typicode.com/users/2')
);
