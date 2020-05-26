import { Observer, Subscription } from 'rxjs';

import { switchedObs } from './operators';
import { searchObs } from './typeahead';
import { dragObs } from './drag-n-drop';
import { userSubject } from './state-management';
import { numberSubject } from './behavior-subject';

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

// #region behaviour subject multicast example
function setInnerText(el: HTMLElement, text: string) {
  el.innerText = el.innerText ? el.innerText + '  ' + text : text;
}

const emittedVals = document.querySelector('#emitted-vals') as HTMLElement;
const span1 = document.querySelector('#sub-1') as HTMLElement;
const span2 = document.querySelector('#sub-2') as HTMLElement;

numberSubject.subscribe({
  next: function (value) {
    setInnerText(emittedVals, value.toString());
  },
  complete: function () {
    setInnerText(emittedVals, 'DONE!');
  }
});

const subBtn1 = document.querySelector('#create-sub-1') as HTMLButtonElement;
subBtn1.addEventListener('click', function() {
  numberSubject.subscribe({
    next: function(value) {
      setInnerText(span1, value.toString());
    },
    complete: function() {
      setInnerText(span1, 'DONE!');
    }
  });
});

const subBtn2 = document.querySelector('#create-sub-2') as HTMLButtonElement;
subBtn2.addEventListener('click', function() {
  numberSubject.subscribe({
    next: function(value) {
      setInnerText(span2, value.toString());
    },
    complete: function() {
      setInnerText(span2, 'DONE!');
    }
  });
});
// #endregion
