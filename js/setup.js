'use strict';

(function () {
  var ENTER_BTN_KEYCODE = 13;
  var ESC_BTN_KEYCODE = 27;
  var setup = document.querySelector('.setup');

  var nameFiled = setup.querySelector('.setup-user-name');
  nameFiled.required = true;
  nameFiled.maxLength = 50;

  var randomColor = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var wizard = document.getElementById('wizard');

  var wizardCoat = wizard.querySelector('#wizard-coat');
  var wizardCoatHandler = function () {
    var wizardCoatColors = [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ];

    wizardCoat.style.fill = randomColor(wizardCoatColors);
  };

  var wizardEyes = wizard.querySelector('#wizard-eyes');
  var wizardEyesHandler = function () {
    var wizardEyesColors = [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ];

    wizardEyes.style.fill = randomColor(wizardEyesColors);
  };

  var setupOpenBtn = document.querySelector('.setup-open-icon');

  var setupClose = function () {
    setup.classList.add('invisible');
    setup.setAttribute('aria-hidden', '');
    setup.removeEventListener('click', setupHandler);
    setup.removeEventListener('keydown', setupHandler);
    wizardCoat.removeEventListener('click', wizardCoatHandler);
    wizardEyes.removeEventListener('click', wizardEyesHandler);
    window.removeEventListener('keydown', escBtnHandler);
  };

  var escBtnHandler = function (evt) {
    if (evt.keyCode === ESC_BTN_KEYCODE && evt.target !== nameFiled) {
      setupClose();
    }
  };

  var enterCondition = function (e) {
    if (e.type === 'click' || e.keyCode === ENTER_BTN_KEYCODE) {
      return true;
    } else {
      return false;
    }
  };

  var setupHandler = function (evt) {
    var setupCloseBtn = setup.querySelector('.setup-close');
    var setupSave = setup.querySelector('.setup-submit');

    var setupFireball = setup.querySelector('.setup-fireball');
    var setupFireballColors = [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ];

    if (enterCondition(evt)) {
      switch (evt.target) {
        case setupCloseBtn:
        case setupSave:
          evt.preventDefault();
          setupClose();
          break;
        case setupFireball:
          setupFireball.parentNode.style.backgroundColor = randomColor(setupFireballColors);
          break;
      }
    }
  };

  var setupOpenBtnHandler = function (evt) {
    if (enterCondition(evt)) {
      setup.classList.remove('invisible');
      setup.removeAttribute('aria-hidden');
      setup.addEventListener('click', setupHandler);
      setup.addEventListener('keydown', setupHandler);
      wizardCoat.addEventListener('click', wizardCoatHandler);
      wizardEyes.addEventListener('click', wizardEyesHandler);
      window.addEventListener('keydown', escBtnHandler);
    }
  };

  setupOpenBtn.addEventListener('click', setupOpenBtnHandler);
  setupOpenBtn.addEventListener('keydown', setupOpenBtnHandler);
})();
