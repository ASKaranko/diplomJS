const showProducts = () => {
  const sentenceElements = document.querySelectorAll('.sentence .row > div'),
    addSentenceBtn = document.querySelector('.add-sentence-btn');

  const showElements = () => {
    const elements = [...sentenceElements];
    elements.forEach(item => {
      if (item.classList.contains('hidden')) {
        item.classList.remove('hidden');
        item.classList.add('visible');
      }
      if (/visible.+block/.test(item.className)) {
        item.className = item.className.replace(/visible.+block/, '');
        item.classList.add('visible');
      }
    });

  };

  addSentenceBtn.addEventListener('click', event => {
    event.preventDefault();
    addSentenceBtn.classList.add('hidden');
    showElements();
  });
};

export default showProducts;
