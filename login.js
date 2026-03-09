document.getElementById('sign-btn').addEventListener('click', function () {
  
  const inputName = document.getElementById('user-name');
  const userName = inputName.value;
  
  const inputPass = document.getElementById('input-pass');
  const password = inputPass.value;

  if (userName === 'admin' && password === 'admin123') {
    alert('Login Successful');
    window.location.assign('home.html');
  } else {
    alert('Login Failed');
  }
});
