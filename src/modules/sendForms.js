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

  const errorPhone = document.createElement('div');
  errorPhone.style.cssText = 'font-size: 1rem; color: red';
  errorPhone.innerHTML = 'Номер должен состоять из + и 11 цифр';

  formBodyArray.forEach(item => {
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
    }
  });

  form.addEventListener('submit', event => {
    const inputPhone = form.querySelector('.phone-user');
    if (inputPhone.value.length === 12) {
      errorPhone.remove();
      event.preventDefault();
      statusMessage.innerHTML = loadMessage;
      if (!form.querySelector('div')) {
        form.appendChild(statusMessage);
      }
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
    } else if (inputPhone.value.length < 12) {
      event.preventDefault();
      form.appendChild(errorPhone);
    } else {
      event.preventDefault();
    }
  });

};
export { form1, form2 };
export default sendForm;
