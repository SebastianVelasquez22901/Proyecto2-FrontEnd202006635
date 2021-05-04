const ruta = "https://backend202006635-proyecto2.herokuapp.com/enfermero";

function cargaMasivaEnfermero() {
  let archivo = document.getElementById("input-file").files[0];
  console.log(archivo);

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    procesarEnfermeros(event.target.result);
  });

  reader.readAsText(archivo, "UTF-8");
}

function procesarEnfermeros(texto) {
  const textarea_res = document.getElementById("textarea-res");
  let enfermeros_array = [];
  console.log(texto);

  texto = texto.split("\n");

  texto.forEach((linea) => {
    if (linea != "") {
      let enfermero_aux = linea.split(",");
      textarea_res.innerHTML += `
        nombre: ${enfermero_aux[0]}
        apellido: ${enfermero_aux[1]}
        fecha_nacimiento: ${enfermero_aux[2]}
        sexo: ${enfermero_aux[3]}
        nombre_usuario: ${enfermero_aux[4]}
        pwd ${enfermero_aux[5]}
        telefono: ${enfermero_aux[6]}
        -------------------------------------
        `;

      let enfermero = {
        nombre: enfermero_aux[0],
        apellido: enfermero_aux[1],
        fecha_nacimiento: enfermero_aux[2],
        sexo: enfermero_aux[3],
        nombre_usuario: enfermero_aux[4],
        pdw: enfermero_aux[5],
        telefono: enfermero_aux[6],
      };

      enfermeros_array.push(enfermero);
    }
  });

  console.log(enfermeros_array);

  let enfermerosCM = {
    enfermero: enfermeros_array,
  };

  fetch(`${ruta}/carga-masiva`, {
    method: "POST",
    body: JSON.stringify(enfermerosCM),
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