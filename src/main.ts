import { Observer, Subscription } from 'rxjs';
import { scanObs, switchedObs } from './operators';
import { searchObs } from './typeahead';
import { dragObs } from './drag-n-drop';

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

// switchMap example
function getSwitchSub(): Subscription {
  return switchedObs.subscribe(observer);
}
let switchSub: Subscription;

const subscribeBtn = document.querySelector('#switch-subscribe') as Element;
subscribeBtn.addEventListener('click', function() {

  if (!switchSub) {
    switchSub = getSwitchSub();
    console.log('subscription created!');
  }
});
const switchStopBtn = document.querySelector('#switch-stop') as Element;
switchStopBtn.addEventListener('click', function() {

  if (switchSub) {
    switchSub.unsubscribe();
    console.log('subscription destroyed!');
  }
});

// search example
searchObs.subscribe(observer);

// drag and drop example
dragObs.subscribe();
