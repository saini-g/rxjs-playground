import { Observer } from 'rxjs';
import { scanObs, switchedObs } from './operators';
import { searchObs } from './typeahead';

const observer: Observer<any> = {
  next: function(value) {
    console.log('emitted value:', value);
  },
  error: function(err) {
    console.log('error thrown', err);
  },
  complete: function() {
    console.log('emitting completed!');
  }
};

const subscription = searchObs.subscribe(observer);

/* const switchStopBtn = document.querySelector('#switch-stop') as Element;

switchStopBtn.addEventListener('click', function() {
  subscription.unsubscribe();
  console.log('subscription destroyed!');
}); */
