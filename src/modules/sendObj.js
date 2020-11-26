const sendObj = obj => {

  const postData = obj => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  });

  postData(obj)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Server not found');
      }
    })
    .catch(error => {
      console.error(error);
    });
};
export default sendObj;
