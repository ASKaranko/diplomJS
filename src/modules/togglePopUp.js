const togglePopUp = () => {
  const callBtnMain = document.querySelectorAll('.call-btn__main'),
    popupCall = document.querySelector('.popup-call'),
    popupDiscount = document.querySelector('.popup-discount'),
    popupCheck = document.querySelector('.popup-check'),
    sentenceSection = document.querySelector('.sentence');

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

  popupDiscount.addEventListener('click', event => {
    hidePopUp(popupDiscount, event);
  });
};

export default togglePopUp;
