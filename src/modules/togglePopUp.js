import sendObj from './sendObj';
import sendForm from './sendForms';

const togglePopUp = () => {
  const callBtnMain = document.querySelectorAll('.call-btn__main'),
    gaugingButton = document.querySelector('.gauging-button'),
    popupCall = document.querySelector('.popup-call'),
    popupDiscount = document.querySelector('.popup-discount'),
    popupCheck = document.querySelector('.popup-check'),
    sentenceSection = document.querySelector('.sentence'),
    constructor = document.querySelector('.constructor'),
    popupConsultation = document.querySelector('.popup-consultation'),
    director = document.querySelector('.director'),
    userName = document.getElementById('name_13'),
    phoneUser = document.getElementById('phone_13'),
    inputMessage = director.querySelector('input'),
    popupCheckForm = document.getElementById('popup-check'),
    popupCallForm = document.getElementById('popup-call'),
    popupDiscountForm = document.getElementById('popup-discount');

  const dataObj = {
    question: '',
    userName: '',
    phoneUser: ''
  };

  const animatePopUp = elem => {

    function draw(timePassed) {
      elem.style.left = timePassed / 25 + '%';
    }

    const start = Date.now();

    const timer = setInterval(() => {
      const timePassed = Date.now() - start;

      if (timePassed > 1250) {
        clearInterval(timer);
        return;
      }

      draw(timePassed);
    }, 10);

  };

  const validation = item => {
    if (/^phone/.test(item.className)) {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9+]/g, '');
        if (item.value.length > 12) {
          item.value = item.value.slice(0, 12);
        }
      });
    } else if (/^name/.test(item.id)) {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-я ]/gi, '');
      });
    } else if (/user_quest/.test(item.name)) {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-я \W]/gi, '');
      });
    }
  };

  const showPopUp = elem => {
    elem.style.display = 'block';
    const elemContent = elem.querySelector('.popup-content');
    if (window.screen.width >= 768) {
      elemContent.style.left = 0;
      animatePopUp(elemContent);
    }
  };

  const hidePopUp = (elem, event) => {
    let target = event.target;

    const elemInput = elem.querySelectorAll('input');
    elemInput.forEach(item => {
      item.value = '';
    });

    if (target.classList.contains('popup-close')) {
      event.preventDefault();
      elem.style.display = 'none';
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        elem.style.display = 'none';
      }
    }
  };

  callBtnMain.forEach(elem => {
    elem.addEventListener('click', event => {
      event.preventDefault();
      showPopUp(popupCall);
    });
  });

  popupCall.addEventListener('click', event => {
    const target = event.target;
    if (!target.classList.contains('popup-close') && target.closest('.popup-content')) {
      if (target.matches('#name_1') || target.matches('#phone_1')) {
        validation(target);
      } else {
        sendForm(popupCallForm);
      }
    } else {
      hidePopUp(popupCall, event);
    }
  });

  sentenceSection.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('sentence-btn')) {
      showPopUp(popupDiscount);
    }
  });

  constructor.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('send')) {
      showPopUp(popupDiscount);
    }
  });

  popupDiscount.addEventListener('click', event => {
    const target = event.target;
    if (!target.classList.contains('popup-close') && target.closest('.popup-content')) {
      if (target.matches('#name_11') || target.matches('#phone_11')) {
        validation(target);
      } else {
        sendForm(popupDiscountForm);
      }
    } else {
      hidePopUp(popupDiscount, event);
    }
  });

  gaugingButton.addEventListener('click', event => {
    event.preventDefault();
    showPopUp(popupCheck);
  });

  popupCheck.addEventListener('click', event => {
    const target = event.target;
    if (!target.classList.contains('popup-close') && target.closest('.popup-content')) {
      if (target.matches('#name_12') || target.matches('#phone_12')) {
        validation(target);
      } else {
        sendForm(popupCheckForm);
      }
    } else {
      hidePopUp(popupCheck, event);
    }
  });

  director.addEventListener('input', event => {
    const target = event.target;
    if (target.matches('.user_quest')) {
      validation(target);
    }
  });

  director.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    if (target.matches('.consultation-btn')) {
      showPopUp(popupConsultation);
    }
  });
  popupConsultation.addEventListener('click', event => {
    const target = event.target;
    if (!target.classList.contains('popup-close') && target.closest('.popup-content')) {
      if (target.matches('#name_13') || target.matches('#phone_13')) {
        validation(target);
      }
      if (target.classList.contains('capture-form-btn')) {
        dataObj.userName = userName.value;
        dataObj.phoneUser = phoneUser.value;
        dataObj.question = inputMessage.value;
        userName.value = '';
        phoneUser.value = '';
        inputMessage.value = '';
        sendObj(dataObj);
        popupConsultation.style.display = 'none';
      }
    } else {
      hidePopUp(popupConsultation, event);
    }
  });

};

export default togglePopUp;
