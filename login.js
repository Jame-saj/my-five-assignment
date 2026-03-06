// console.log('ok');

document.getElementById('sign-btn').addEventListener('click', function () {
  // user
  const inputName = document.getElementById('user-name');
  const userName = inputName.value;
  // console.log(userName);

  // pass
  const inputPass = document.getElementById('input-pass');
  const password = inputPass.value;
  // console.log(password);

  if (userName === 'admin' && password === 'admin123') {
    alert('Login Successful');
    window.location.assign('home.html');
  } else {
    alert('Login Failed');
  }
});
