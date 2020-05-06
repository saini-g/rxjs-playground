import obs from './observables';

obs.subscribe(
  function (value) {
    console.log('emitted value:', value);
  },
  function (err) {
    console.log('error thrown', err.message);
  },
  function () {
    console.log('emitting completed!');
  }
);
