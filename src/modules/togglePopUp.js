import sendObj from './sendObj';

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
    inputMessage = director.querySelector('input');

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

  const showPopUp = elem => {
    elem.style.display = 'block';
    const elemContent = elem.querySelector('.popup-content');
    if (window.screen.width >= 768) {
      elemContent.style.left = 0;
      animatePopUp(elemContent);
    }
  };

  const hidePopUp = (elem, event) => {
    event.preventDefault();
    let target = event.target;

    if (target.classList.contains('popup-close')) {
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
    hidePopUp(popupCall, event);
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
    hidePopUp(popupDiscount, event);
  });

  gaugingButton.addEventListener('click', event => {
    event.preventDefault();
    showPopUp(popupCheck);
  });

  popupCheck.addEventListener('click', event => {
    hidePopUp(popupCheck, event);
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
    if (target.classList.contains('capture-form-btn')) {
      dataObj.userName = userName.value;
      dataObj.phoneUser = phoneUser.value;
      dataObj.question = inputMessage.value;
      sendObj(dataObj);
      popupConsultation.style.display = 'none';
    }
    hidePopUp(popupConsultation, event);
  });
};

export default togglePopUp;
