const ruta = "https://backend202006635-proyecto2.herokuapp.com/usuario";

function registrarUsuario(event) {
  event.preventDefault();
  
  let input_nombre = document.getElementById("input-nombre").value;
  let input_apellido = document.getElementById("input-apellido").value;
  let input_fecha = document.getElementById("input-fecha").value;
  let input_sexo = document.getElementById("input-genero").value;
  let input_nombre_usuario = document.getElementById("input-nombredeusuario").value;
  let input_pwd = document.getElementById("input-pwd").value;
  let input_telefono = document.getElementById("input-telefono").value;

  let usuario = {
    nombre: input_nombre,
    apellido: input_apellido,
    fecha_nacimiento: input_fecha,
    sexo: input_sexo,
    nombre_usuario: input_nombre_usuario,
    pwd: input_pwd,
    telefono: input_telefono
    
  };

  fetch(ruta, {
    method: "PUT",
    body: JSON.stringify(usuario),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(function(response) {
      if(response.mensaje == "OK"){
          localStorage.setItem("usuario", JSON.stringify(usuario))
          alert('Usuario creado correctamente')
          window.location.href="login.html";
      }

  })
  .catch(error => console.log(error))
}


function logIn() {
  const input_nombre_usuario = document.getElementById("input-nombredeusuario");
  const input_pwd = document.getElementById("input-pwd");

  let login = {
    nombre_usuario: input_nombre_usuario.value,
    pwd: input_pwd.value
  };

  console.log(login)

  fetch(`${ruta}/login`, {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(response => {

    if(response.mensaje != "OK"){
      Swal.fire({
        title: "Iniciar sesión",
        text: `Credenciales inválidas`,
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Iniciar sesión",
      text: `Bienvenido ${response.usuario.nombre}`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    window.location.href = 'Principal2.html';
  })
}
