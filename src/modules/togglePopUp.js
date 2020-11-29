import sendObj from './sendObj';
import sendFormConc from './sendFormconc';

const togglePopUp = () => {
  const callBtnMain = document.querySelectorAll('.call-btn__main'),
    gaugingButton = document.querySelector('.gauging-button'),
    popupCall = document.querySelector('.popup-call'),
    popupDiscount = document.querySelector('.popup-discount'),
    popupCheck = document.querySelector('.popup-check'),
    sentenceSection = document.querySelector('.sentence'),
    constructor = document.querySelector('.constructor'),
    popupConsultation = document.querySelector('.popup-consultation'),
    popupConsultationForm = document.querySelector('.popup-consultation .capture-form'),
    director = document.querySelector('.director'),
    userName11 = document.getElementById('name_11'),
    phoneUser11 = document.getElementById('phone_11'),
    userName13 = document.getElementById('name_13'),
    phoneUser13 = document.getElementById('phone_13'),
    userName1 = document.getElementById('name_1'),
    phoneUser1 = document.getElementById('phone_1'),
    userName12 = document.getElementById('name_12'),
    phoneUser12 = document.getElementById('phone_12'),
    inputMessage = director.querySelector('input'),
    popupCheckForm = document.getElementById('popup-check'),
    popupCallForm = document.getElementById('popup-call'),
    popupDiscountForm = document.getElementById('popup-discount'),
    phoneInputUser1 = popupDiscount.querySelector('.phone-user');

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

  const errorPhone = document.createElement('div');
  errorPhone.style.cssText = 'font-size: 1rem; color: red';
  errorPhone.innerHTML = 'Номер должен состоять из + и 11 цифр';

  popupCall.addEventListener('click', event => {
    const target = event.target;
    if (!target.classList.contains('popup-close') && target.closest('.popup-content')) {
      if (target.matches('#name_1') || target.matches('#phone_1')) {
        validation(target);
      } else if (target.matches('.capture-form-btn')) {
        if (userName1.value !== '' && phoneUser1.value !== '' && phoneUser1.value.length === 12) {
          event.preventDefault();
          errorPhone.remove();
          sendFormConc(popupCallForm);
        } else if (phoneUser1.value.length < 12) {
          event.preventDefault();
          popupCallForm.appendChild(errorPhone);
        } else {
          event.preventDefault();
        }
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

  const handler = event => {
    const target = event.target;
    if (!target.classList.contains('popup-close') && target.closest('.popup-content')) {
      if (target.matches('#name_11') || target.matches('#phone_11')) {
        validation(target);
      } else if (target.matches('.capture-form-btn')) {
        if (userName11.value !== '' && phoneUser11.value !== '' && phoneInputUser1.value.length === 12) {
          errorPhone.remove();
          event.preventDefault();
          if (!localStorage.getItem('calc') && !localStorage.getItem('calcSent')) {
            sendFormConc(popupDiscountForm);
          } else if (localStorage.getItem('calc') && localStorage.getItem('calcSent')) {
            sendFormConc(popupDiscountForm);
            localStorage.removeItem('calcSent');
            localStorage.removeItem('calc');
          } else {
            return;
          }
        } else if (phoneUser11.value.length < 12) {
          event.preventDefault();
          popupDiscountForm.appendChild(errorPhone);
        } else {
          event.preventDefault();
        }
      }
    } else {
      hidePopUp(popupDiscount, event);
    }
  };

  popupDiscount.addEventListener('click', handler);


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
        if (userName12.value !== '' && phoneUser12.value !== '' && phoneUser12.value.length === 12) {
          errorPhone.remove();
          event.preventDefault();
          sendFormConc(popupCheckForm);
        } else if (phoneUser12.value.length < 12) {
          event.preventDefault();
          popupCheckForm.appendChild(errorPhone);
        } else {
          event.preventDefault();
        }
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
        if (userName13.value !== '' && phoneUser13.value !== '' && phoneUser13.value.length === 12) {
          errorPhone.remove();
          event.preventDefault();
          dataObj.userName = userName13.value;
          dataObj.phoneUser = phoneUser13.value;
          dataObj.question = inputMessage.value;
          userName13.value = '';
          phoneUser13.value = '';
          inputMessage.value = '';
          sendObj(dataObj);
        } else if (phoneUser13.value.length < 12) {
          event.preventDefault();
          popupConsultationForm.appendChild(errorPhone);
        } else {
          event.preventDefault();
        }
      }
    } else {
      hidePopUp(popupConsultation, event);
    }
  });

};

export default togglePopUp;
