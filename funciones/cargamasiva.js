const ruta = "https://backend202006635-proyecto2.herokuapp.com/doctor";

function cargaMasiva() {
  let archivo = document.getElementById("input-file").files[0];
  console.log(archivo);

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    procesarDoctores(event.target.result);
  });

  reader.readAsText(archivo, "UTF-8");
}

function procesarDoctores(texto) {
  const textarea_res = document.getElementById("textarea-res");
  let doctores_array = [];
  console.log(texto);

  texto = texto.split("\n");

  texto.forEach((linea) => {
    if (linea != "") {
      let doctor_aux = linea.split(",");
      textarea_res.innerHTML += `
        nombre: ${doctor_aux[0]}
        apellido: ${doctor_aux[1]}
        fecha_nacimiento: ${doctor_aux[2]}
        sexo: ${doctor_aux[3]}
        nombre_usuario: ${doctor_aux[4]}
        pwd ${doctor_aux[5]}
        especialidad: ${doctor_aux[6]}
        telefono: ${doctor_aux[7]}
        -------------------------------------
        `;

      let doctor = {
        nombre: doctor_aux[0],
        apellido: doctor_aux[1],
        fecha_nacimiento: doctor_aux[2],
        sexo: doctor_aux[3],
        nombre_usuario: doctor_aux[4],
        pdw: doctor_aux[5],
        especialidad: doctor_aux[6],
        telefono: doctor_aux[7],
      };

      doctores_array.push(doctor);
    }
  });

  console.log(doctores_array);

  let doctoresCM = {
    doctor: doctores_array,
  };

  fetch(`${ruta}/carga-masiva`, {
    method: "POST",
    body: JSON.stringify(doctoresCM),
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