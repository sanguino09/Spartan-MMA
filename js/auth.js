document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('loginUser').value.trim();
      const pass = document.getElementById('loginPass').value;
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const message = document.getElementById('loginMessage');
      if (users[user] && users[user] === pass) {
        message.textContent = 'Inicio de sesión exitoso';
        message.style.color = 'green';
        localStorage.setItem('currentUser', user);
        loginForm.reset();
      } else {
        message.textContent = 'Usuario o contraseña incorrectos';
        message.style.color = 'red';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('regUser').value.trim();
      const pass = document.getElementById('regPass').value;
      const pass2 = document.getElementById('regPass2').value;
      const message = document.getElementById('registerMessage');
      const users = JSON.parse(localStorage.getItem('users') || '{}');

      if (pass !== pass2) {
        message.textContent = 'Las contraseñas no coinciden';
        message.style.color = 'red';
        return;
      }
      if (users[user]) {
        message.textContent = 'El usuario ya existe';
        message.style.color = 'red';
        return;
      }
      users[user] = pass;
      localStorage.setItem('users', JSON.stringify(users));
      message.textContent = 'Registro exitoso, ya puedes iniciar sesión';
      message.style.color = 'green';
      registerForm.reset();
    });
  }
});
