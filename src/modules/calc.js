import sendObj from './sendObj';
import validation from './togglePopUp';

const calc = () => {
  const constructor = document.querySelector('.constructor'),
    questionPanels = document.querySelectorAll('.constructor .panel-heading'),
    panelCollapse = document.querySelectorAll('.constructor .panel-collapse'),
    constructBtn = document.querySelectorAll('.construct-btn'),
    calcResult = document.querySelector('#calc-result'),
    diameterOne = document.getElementById('diameter-one'),
    diameterTwo = document.getElementById('diameter-two'),
    ringOne = document.getElementById('ring-one'),
    ringTwo = document.getElementById('ring-two'),
    collapseTwoDivs = document.querySelectorAll('#collapseTwo .panel-body > div'),
    collapseFourInput = document.querySelector('#collapseFour input'),
    popupDiscount = document.querySelector('.popup-discount'),
    userName = document.getElementById('name_11'),
    phoneUser = document.getElementById('phone_11');

  let data = {
    chamber: 1,
    bottom: 1,
    diam1: 1.4,
    diam2: 1.4,
    ringCount1: 1,
    ringCount2: 1,
    total: 10000,
    distance: 0,
    userName: '',
    phoneUser: ''
  };
  calcResult.value = data.total;
  let trigger = false;

  const countSum = () => {
    data.diam1 = +diameterOne.value;
    data.diam2 = +diameterTwo.value;
    data.ringCount1 = +ringOne.value;
    data.ringCount2 = +ringTwo.value;

    if (data.chamber === 2) {
      data.total = 10000;
      data.total += 5000;
      collapseTwoDivs.forEach((item, index) => {
        if (index >= 3) {
          collapseTwoDivs[index].style.display = '';
        }
      });
    } else if (data.chamber === 1) {
      data.total = 10000;
      collapseTwoDivs.forEach((item, index) => {
        if (index >= 3) {
          collapseTwoDivs[index].style.display = 'none';
        }
      });
    }
    if (data.diam1 === 2 || data.diam2 === 2) {
      data.total *= 1.2;
    }
    if (data.ringCount1 === 2) {
      data.total += 3000;
    } else if (data.ringCount1 === 3) {
      data.total += 5000;
    }
    if (data.ringCount2 === 2) {
      data.total += 1000;
    } else if (data.ringCount2 === 3) {
      data.total += 2000;
    }
    if (data.bottom === 1 && data.chamber === 1 && trigger === true) {
      data.total *= 1.1;
    } else if (data.bottom === 1 && data.chamber === 2 && trigger === true) {
      data.total *= 1.2;
    }
    return data.total;
  };

  const togglePanels = index => {
    for (let i = 0; i < questionPanels.length; i++) {
      if (index === i) {
        panelCollapse[i].classList.add('in');
      } else {
        panelCollapse[i].classList.remove('in');
      }
    }
  };

  const handler = event => {
    const target = event.target;
    if (!target.classList.contains('popup-close') && target.closest('.popup-content')) {
      if (target.matches('#name_11') || target.matches('#phone_11')) {
        validation(target);
      }
      if (target.matches('.capture-form-btn')) {
        data.userName = userName.value;
        data.phoneUser = phoneUser.value;
        sendObj(data);
        userName.value = '';
        phoneUser.value = '';
        popupDiscount.style.display = 'none';
        popupDiscount.removeEventListener('click', handler);
      }
    }
  };

  const changeStyle = target => {
    target = target.closest('.onoffswitch');
    const onoffswitchSwitch = target.querySelector('.onoffswitch-switch'),
      onoffswitchInner = target.querySelector('.onoffswitch-inner'),
      input = target.querySelector('.onoffswitch-checkbox');
    let elem = 1;

    if (/two$/.test(input.id)) {
      elem = data.bottom;
    } else {
      elem = data.chamber;
    }
    if (elem === 1) {
      onoffswitchSwitch.style.left = '0%';
      onoffswitchSwitch.style.backgroundColor = '#A1A1A1';
      onoffswitchInner.style.marginLeft = '-100%';
      elem = 2;
    } else if (elem === 2) {
      onoffswitchSwitch.style.left = '';
      onoffswitchSwitch.style.backgroundColor = '#93c706';
      onoffswitchInner.style.marginLeft = '0';
      elem = 1;
    }
    if (/two$/.test(input.id)) {
      data.bottom = elem;
    } else {
      data.chamber = elem;
    }
  };

  constructor.addEventListener('click', event => {
    event.preventDefault();
    let target = event.target;

    if (target.closest('.construct-btn')) {
      constructBtn.forEach((item, i) => {
        if (item === target.closest('.construct-btn')) {
          if (i === 1) {
            trigger = true;
            calcResult.value = Math.floor(countSum());
          }
          if (i === 3) {
            data.distance = +collapseFourInput.value;
            popupDiscount.addEventListener('click', handler);
          } else {
            i++;
            togglePanels(i);
          }
        }
      });
    }
    if (target.closest('.panel-heading')) {
      questionPanels.forEach((item, i) => {
        if (item === target.closest('.panel-heading')) {
          if (i === 2) {
            trigger = true;
            calcResult.value = Math.floor(countSum());
          }
          togglePanels(i);
        }
      });
    }
    if (target.closest('.onoffswitch')) {
      target = target.closest('.onoffswitch');
      changeStyle(target);
      calcResult.value = Math.floor(countSum());
    }
  });



  constructor.addEventListener('change', event => {
    const target = event.target;

    if (target === diameterOne || target === diameterTwo || target === ringOne || target === ringTwo) {
      calcResult.value = Math.floor(countSum());
    }
    if (target === collapseFourInput) {
      data.distance = +collapseFourInput.value;
    }
  });
  calcResult.value = Math.floor(countSum());
};

export default calc;
