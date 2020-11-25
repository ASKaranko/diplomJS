const togglePopUp = () => {
  const callBtnMain = document.querySelectorAll('.call-btn__main'),
    popupCall = document.querySelector('.popup-call'),
    popupCheck = document.querySelector('.popup-check'),
    popupContentCall = document.querySelector('.popup-call .popup-content');

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

  callBtnMain.forEach(elem => {
    elem.addEventListener('click', event => {
      popupCall.style.display = 'block';
      if (window.screen.width >= 768) {
        event.preventDefault();
        popupContentCall.style.left = 0;
        animatePopUp(popupContentCall);
      }
    });
  });

  popupCall.addEventListener('click', event => {
    event.preventDefault();
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      popupCall.style.display = 'none';
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        popupCall.style.display = 'none';
      }
    }
  });
};

export default togglePopUp;
