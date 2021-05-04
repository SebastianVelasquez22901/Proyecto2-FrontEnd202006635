const ruta = "https://backend202006635-proyecto2.herokuapp.com/paciente";

function cargaMasivaPaciente() {
  let archivo = document.getElementById("input-file").files[0];
  console.log(archivo);

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    procesarPacientes(event.target.result);
  });

  reader.readAsText(archivo, "UTF-8");
}

function procesarPacientes(texto) {
  const textarea_res = document.getElementById("textarea-res");
  let pacientes_array = [];
  console.log(texto);

  texto = texto.split("\n");

  texto.forEach((linea) => {
    if (linea != "") {
      let paciente_aux = linea.split(",");
      textarea_res.innerHTML += `
        nombre: ${paciente_aux[0]}
        apellido: ${paciente_aux[1]}
        fecha_nacimiento: ${paciente_aux[2]}
        sexo: ${paciente_aux[3]}
        nombre_usuario: ${paciente_aux[4]}
        pwd ${paciente_aux[5]}
        telefono: ${paciente_aux[6]}
        -------------------------------------
        `;

      let paciente = {
        nombre: paciente_aux[0],
        apellido: paciente_aux[1],
        fecha_nacimiento: paciente_aux[2],
        sexo: paciente_aux[3],
        nombre_usuario: paciente_aux[4],
        pdw: paciente_aux[5],
        telefono: paciente_aux[6],
      };

      pacientes_array.push(paciente);
    }
  });

  console.log(pacientes_array);

  let pacientesCM = {
    paciente: pacientes_array,
  };

  fetch(`${ruta}/carga-masiva`, {
    method: "POST",
    body: JSON.stringify(pacientesCM),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.mensaje != "OK") {
        console.error(response.mensaje);
        
        Swal.fire({
            title: "Carga masiva",
            text: "Error al realizar la carga masiva",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
      }

      Swal.fire({
        title: "Carga masiva",
        text: "Carga masiva realizada con éxito",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    });
}