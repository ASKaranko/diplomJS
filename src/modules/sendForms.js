const form1 = document.getElementById('main-form'),
  form2 = document.getElementById('capture-form');

const sendForm = form => {
  const errorMessage = 'Произошла ошибка доступа к серверу...',
    loadMessage = 'Идет отправка данных...',
    successMessage = 'Отправлено!';

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: #85be32';

  const formBodyArray = [...form.elements];

  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  formBodyArray.forEach(item => {
    if (/^phone/.test(item.className)) {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9+]/g, '');
      });
    } else if (/^name/.test(item.id)) {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-я ]/gi, '');
      });
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    statusMessage.textContent = loadMessage;
    form.appendChild(statusMessage);
    const formData = new FormData(form);
    const body = {};
    formData.forEach((item, i) => {
      body[i] = item;
    });

    function clearMessage() {
      statusMessage.remove();
    }

    postData(body)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Server not found');
        }
        statusMessage.textContent = successMessage;
        setTimeout(clearMessage, 3000);
        formBodyArray.forEach(item => {
          if (item.tagName.toLowerCase() !== 'button') {
            item.value = '';
          }
        });
      })
      .catch(error => {
        console.error(error);
        statusMessage.textContent = errorMessage;
      });
  });

};
export { form1, form2 };
export default sendForm;
