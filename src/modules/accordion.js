const accordion = () => {
  const questions = document.querySelector('.questions'),
    questionPanels = document.querySelectorAll('.questions .panel'),
    panelCollapse = document.querySelectorAll('.questions .panel-collapse');

  const togglePanels = index => {
    for (let i = 0; i < questionPanels.length; i++) {
      if (index === i) {
        panelCollapse[i].classList.add('in');
      } else {
        panelCollapse[i].classList.remove('in');
      }
    }
  };

  questions.addEventListener('click', event => {
    event.preventDefault();
    let target = event.target;
    target = target.closest('.panel');
    if (target) {
      questionPanels.forEach((item, i) => {
        if (item === target) {
          togglePanels(i);
        }
      });
    }
  });
};

export default accordion;
