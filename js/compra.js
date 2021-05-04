const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });


}

function procesarCompra() {
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "index.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        var element = document.getElementById('canvas_div_pdf');
        html2pdf(element);
    
        (function () {
            emailjs.init("user_fHshlTVvlnaNJFhjUebU2");
        })();

        var myform = $("form#procesar-pago");

        myform.submit( (event) => {
            event.preventDefault();

            
            var service_id = "default_service";
            var template_id = "template_l48uh9k";

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = 'img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            emailjs.sendForm(service_id, template_id, myform[0])
                .then(() => {
                    cargandoGif.style.display = 'none';
                    document.querySelector('#loaders').appendChild(enviado);

                    setTimeout(() => {
                        compra.vaciarLocalStorage();
                        enviado.remove();
                        window.location = "Agregarmedicamento.html";
                    }, 2000);


                }, (err) => {
                    alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                });

            return false;

        });

    }
}

