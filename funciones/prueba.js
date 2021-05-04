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
        filas += `\n<div class="col-6 col-md-4 col-xl-3 col-xxl-2">
        <div class="app-card app-card-doc shadow-sm h-100">
          <div class="app-card-thumb-holder p-3">
            <a class="app-card-link-mask" href="#file-link"></a>
          </div>
          <div class="app-card-body p-3 has-card-actions">
            <h4 class="app-doc-title truncate mb-0">
              <a href="#file-link">${medicamento.nombre}</a>
            </h4>
            <div class="app-doc-meta">
              <ul class="list-unstyled mb-0">
                <li><span>Precio:</span> Q${medicamento.precio}</li>
                <li><span>Descripción:</span> ${medicamento.descripcion}</li>
                <li><span>Código:</span> ${medicamento.id}</li>
              </ul>
            </div>
            <!--//app-doc-meta-->
            <a onclick="agregarCarrito(${medicamento.id})">
              <div class="app-card-actions">
                <div class="dropdown">
                  <div
                    class="dropdown-toggle no-toggle-arrow"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="1em"
                      height="1em"
                      viewBox="0 0 40 36"
                      style="enable-background: new 0 0 40 36"
                      xml:space="preserve"
                    >
                      <g id="Page-1_4_" sketch:type="MSPage">
                        <g
                          id="Desktop_4_"
                          transform="translate(-84.000000, -410.000000)"
                          sketch:type="MSArtboardGroup"
                        >
                          <path
                            id="Cart"
                            sketch:type="MSShapeGroup"
                            class="st0"
                            d="M94.5,434.6h24.8l4.7-15.7H92.2l-1.3-8.9H84v4.8h3.1l3.7,27.8h0.1
         c0,1.9,1.8,3.4,3.9,3.4c2.2,0,3.9-1.5,3.9-3.4h12.8c0,1.9,1.8,3.4,3.9,3.4c2.2,0,3.9-1.5,3.9-3.4h1.7v-3.9l-25.8-0.1L94.5,434.6"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <!--//dropdown-toggle-->
                </div>
                <!--//dropdown-->
              </div>
            </a>
            <!--//app-card-actions-->
          </div>
          <!--//app-card-body-->
        </div>
        <!--//app-card-->
      </div>
     `;
      });

      $("#body-productos").empty();
      $("#body-productos").append(filas);

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
