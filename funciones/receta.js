let plantillaHTML = "";
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
                <td>Fecha</td>
                <td>Nombre del paciente</td>
                <td>Padecimiento</td>
                <td>Descripcion</td>                
              </tr>`;
              plantillaHTML += `</table>
          </div>
        </body>
      </html>`;
              console.log(plantillaHTML);
function saveTask(e) {
  let fecha = document.getElementById('fecha-hora').value;
  let description = document.getElementById('description').value;
  let nombre = document.getElementById('input-nombre').value;
  let pacedecimiento = document.getElementById('input-padecimiento').value;
  console.log(description)

  let task = {
    fecha,
    description,
    nombre,
    pacedecimiento
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function getTasks() {
  

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    let fecha = tasks[i].fecha;
    let nombre = tasks[i].nombre;
    let padecimiento = tasks[i].padecimiento;
    let description = tasks[i].description;
    plantillaHTML += `\n<tr>
          <td class="cell">${fecha}</td>
          <td class="cell">${nombre}</td>
          <td class="cell">${padecimiento}</td>
          <td class="cell">${description}</td>
          </tr>`;
  }
}



