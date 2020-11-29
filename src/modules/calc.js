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
    phoneUser = document.getElementById('phone_11'),
    collapseOne = document.querySelector('#collapseOne'),
    collapseThree = document.querySelector('#collapseThree'),
    popupDiscountContent = document.querySelector('.popup-discount .popup-content');

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

  const reset = () => {
    data = {
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
    diameterOne.value = data.diam1;
    diameterTwo.value = data.diam2;
    ringOne.value = data.ringCount1;
    ringTwo.value = data.ringCount2;
    calcResult.value = data.total;
    const onoffswitchSwitch1 = collapseOne.querySelector('.onoffswitch-switch'),
      onoffswitchInner1 = collapseOne.querySelector('.onoffswitch-inner'),
      onoffswitchSwitch3 = collapseThree.querySelector('.onoffswitch-switch'),
      onoffswitchInner3 = collapseThree.querySelector('.onoffswitch-inner');

    onoffswitchSwitch1.style.left = '';
    onoffswitchSwitch1.style.backgroundColor = '#93c706';
    onoffswitchInner1.style.marginLeft = '0';
    onoffswitchSwitch3.style.left = '';
    onoffswitchSwitch3.style.backgroundColor = '#93c706';
    onoffswitchInner3.style.marginLeft = '0';
  };

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
      if (target.matches('.capture-form-btn')) {
        if (userName.value !== '' && phoneUser.value !== '') {
          data.userName = userName.value;
          data.phoneUser = phoneUser.value;
          sendObj(data);
          userName.value = '';
          phoneUser.value = '';
          reset();
          localStorage.setItem('calcSent', 1);
          localStorage.setItem('calc', 1);
          popupDiscount.removeEventListener('click', handler);
        } else {
          const statusMessage1 = document.createElement('div');
          statusMessage1.style.cssText = 'font-size: 2rem; color: #85be32';
          statusMessage1.innerHTML = 'Пожалуйста, заполните все поля';
          popupDiscountContent.appendChild(statusMessage1);
          setTimeout(() => {
            statusMessage1.remove();
          }, 3000);
          popupDiscount.addEventListener('click', handler);
        }
      }
    } else {
      localStorage.removeItem('calc');
      localStorage.removeItem('calcSent', 1);
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
            localStorage.setItem('calc', 1);
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
