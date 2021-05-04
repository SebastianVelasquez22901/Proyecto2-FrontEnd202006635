const ruta = "https://backend202006635-proyecto2.herokuapp.com/medicamento";
let plantillaHTML = "";

function cargarProductos() {
  fetch(ruta, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      let medicamentos = response.data;

      let filas = "";

      medicamentos.forEach((medicamento) => {
        filas += `\n <div class="card mb-4 shadow-sm">
        <div class="card-header">
            <h4 class="my-0 font-weight-bold">${medicamento.nombre}</h4>
        </div>
        <div class="card-body">
            <h1 class="card-title pricing-card-title precio">S/. <span class="">${medicamento.precio}</span></h1>

            <ul class="list-unstyled mt-3 mb-4">
                <li>${medicamento.descripcion}</li>
            </ul>
            <a href="" class="btn btn-block btn-primary agregar-carrito" data-id=${medicamento.id}>Comprar</a>
        </div>
    </div>`;
      });
         
      $("#lista-productos").empty();
      $("#lista-productos").append(filas);

      localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
    })
    .catch((err) => console.log(err));
}

async function agregarCarrito(id_medicamento) {
  let carrito = await localStorage.getItem("carrito");

  if (!carrito) {
    carrito = [{ id: id_medicamento, cantidad: 1 }];
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
      text: "Agregado al carrito",
      toast: true,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      position: 'bottom-right'
    });
    return;
  }

  carrito = await JSON.parse(carrito);
  let existe = false;

  carrito.forEach((medicamento) => {
    if (medicamento.id == id_medicamento) {
      medicamento.cantidad++;
      console.log(carrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      existe = true;
      Swal.fire({
        text: "Agregado al carrito",
        toast: true,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        position: 'bottom-right'
      });
      return;
    }
  });

  if (!existe) {
    carrito.push({ id: id_medicamento, cantidad: 1 });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
      text: "Agregado al carrito",
      toast: true,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      position: 'bottom-right'
    });
    console.log(carrito);
  }
}
