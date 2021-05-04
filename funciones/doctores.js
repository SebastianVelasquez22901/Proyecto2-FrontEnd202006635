const ruta = "https://backend202006635-proyecto2.herokuapp.com/doctor";
let plantillaHTML = "";

function cargarDoctores() {
  const body_doctor = document.getElementById("body-doctores");

  fetch(ruta, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      let doctores = response.data;

      let filas = "";

      doctores.forEach((doctor) => {
        filas += `\n<tr>
        <td class="cell">${doctor.id}</td>
        <td class="cell">${doctor.nombre}</td>
        <td class="cell">${doctor.apellido}</td>
        <td class="cell">${doctor.fecha_nacimiento}</td>
        <td class="cell">${doctor.sexo}</td>
        <td class="cell">${doctor.nombre_usuario}</td>
        <td class="cell">${doctor.pwd}</td>
        <td class="cell">${doctor.especialidad}</td>
        <td class="cell">${doctor.telefono}</td>
        <td><button class="deleteBtn">Delete</button></td>
        </tr>`;
      });

      $("#body-doctores").empty();
      $("#body-doctores").append(filas);

      plantillaHTML = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      
          <title>Reporte Doctores</title>
      
          <link rel="icon" href="./images/favicon.png" type="image/x-icon" />
      
          <style>
            body {
              font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
              text-align: center;
              color: #777;
            }
      
            body h1 {
              font-weight: 300;
              margin-bottom: 0px;
              padding-bottom: 0px;
              color: #000;
            }
      
            body h3 {
              font-weight: 300;
              margin-top: 10px;
              margin-bottom: 20px;
              font-style: italic;
              color: #555;
            }
      
            body a {
              color: #06f;
            }
      
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              font-size: 16px;
              line-height: 24px;
              font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
              color: #555;
            }
      
            .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
              border-collapse: collapse;
            }
      
            .invoice-box table td {
              padding: 5px;
              vertical-align: top;
            }
      
            .invoice-box table tr td:nth-child(2) {
              text-align: right;
            }
      
            .invoice-box table tr.top table td {
              padding-bottom: 20px;
            }
      
            .invoice-box table tr.top table td.title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
            }
      
            .invoice-box table tr.information table td {
              padding-bottom: 40px;
            }
      
            .invoice-box table tr.heading td {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
            }
      
            .invoice-box table tr.details td {
              padding-bottom: 20px;
            }
      
            .invoice-box table tr.item td {
              border-bottom: 1px solid #eee;
            }
      
            .invoice-box table tr.item.last td {
              border-bottom: none;
            }
      
            .invoice-box table tr.total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
            }
      
            @media only screen and (max-width: 600px) {
              .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
              }
      
              .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
              }
            }
          </style>
        </head>
      
        <body>
          <div class="invoice-box">
            <table>
              <tr class="top">
                <td colspan="2">
                  <table>
                    <tr>
                      <td class="title">
                        <h4>Hospital USAC</h4>
                      </td>
      
                      <td>Fecha creación: ${new Date().toLocaleDateString("es-US")}<br /></td>
                    </tr>
                  </table>
                </td>
              </tr>
      
              <tr class="information">
                <td colspan="2">
                  <table>
                    <tr>
                    <td>
                    Hospital USAC.<br />
                    Guatemala, Gua
                    </td>
      
                      <td>
                        USAC.<br />
                        Sebas<br />
                        sebas@example.com
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
      
            <table>
              <tr class="heading">
                <td>ID</td>
                <td>Nombre</td>
                <td>Apellido</td>
                <td>Fecha de nacimiento</td>
                <td>Sexo</td>
                <td>Nombre de usuario</td>
                <td>Contraseña</td>
                <td>Especialidad</td>
                <td>Telefono</td>
              </tr>`;

              doctores.forEach((doctor) => {
                plantillaHTML += `\n<tr>
                <td class="cell">${doctor.id}</td>
                <td class="cell">${doctor.nombre}</td>
                <td class="cell">${doctor.apellido}</td>
                <td class="cell">${doctor.fecha_nacimiento}</td>
                <td class="cell">${doctor.sexo}</td>
                <td class="cell">${doctor.nombre_usuario}</td>
                <td class="cell">${doctor.pwd}</td>
                <td class="cell">${doctor.especialidad}</td>
                <td class="cell">${doctor.telefono}</td>
                </tr>`;
              });

      plantillaHTML += `</table>
          </div>
        </body>
      </html>`;

      console.log(plantillaHTML);
    })
    .catch((err) => console.log(err));
}

function generarReporte() {
  html2pdf().from(plantillaHTML).toPdf().save("reporte_doc.pdf");
}
