import { Observer, Subscription } from 'rxjs';

import { scanObs, switchedObs } from './operators';
import { searchObs } from './typeahead';
import { dragObs } from './drag-n-drop';
import { userSubject } from './state-management';

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

// #region switchMap example
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
// #endregion

// #region search example
searchObs.subscribe(observer);
// #endregion

// #region drag and drop example
dragObs.subscribe();
// #endregion

// #region state management using subject
userSubject.subscribe({
  next: function(user) {

    if (user.id) {
      const detailsBox = document.getElementById('user-details') as HTMLElement;
      detailsBox.innerHTML = `
        <p><strong>${user.name}</strong></p>
        <p>${user.email}</p>
      `;
    }
  }
});
// #endregion
