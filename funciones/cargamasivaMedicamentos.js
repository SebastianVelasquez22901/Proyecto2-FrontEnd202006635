const ruta = "https://backend202006635-proyecto2.herokuapp.com/medicamento";

function cargaMasivaMedicamento() {
  let archivo = document.getElementById("input-file").files[0];
  console.log(archivo);

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    procesarMedicamento(event.target.result);
  });

  reader.readAsText(archivo, "UTF-8");
}

function procesarMedicamento(texto) {
  const textarea_res = document.getElementById("textarea-res");
  let medicamentos_array = [];
  console.log(texto);

  texto = texto.split("\n");

  texto.forEach((linea) => {
    if (linea != "") {
      let medicamento_aux = linea.split(",");
      textarea_res.innerHTML += `
        nombre: ${medicamento_aux[0]}
        precio: ${medicamento_aux[1]}
        descripcion: ${medicamento_aux[2]}
        cantidad: ${medicamento_aux[3]}
        -------------------------------------
        `;

      let medicamento = {
        nombre: medicamento_aux[0],
        precio: medicamento_aux[1],
        descripcion: medicamento_aux[2],
        cantidad: medicamento_aux[3],
      };

      medicamentos_array.push(medicamento);
    }
  });

  console.log(medicamentos_array);

  let medicamentosCM = {
    medicamento: medicamentos_array,
  };

  fetch(`${ruta}/carga-masiva`, {
    method: "POST",
    body: JSON.stringify(medicamentosCM),
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