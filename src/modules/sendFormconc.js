const sendFormConc = form => {
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

  // event.preventDefault();
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

};
export default sendFormConc;
