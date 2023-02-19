// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
});

async function registrarUsuarios(){
    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.apellido = document.getElementById('txtApellido').value;
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;
    let repetirPassword = document.getElementById('txtRepetirPassword').value;
    if(repetirPassword != datos.password){
        alert('Las contraseñas no coinciden');
        return;
    }
    const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    alert('La cuenta fue creada con exito');
        window.location.href = 'login.html'
}

async function crearPedido(){
    let datos = {};
    datos.producto = document.getElementById('nameProduct').value;
    datos.precio = document.getElementById('priceProduct').value;
    datos.cantidad = document.getElementById('txtCantidad').value;
    datos.total = datos.cantidad * datos.precio;

    const request = await fetch('api/pedidos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    $('#alert').fadeIn();
    setTimeout(function() {
        $("#alert").fadeOut();
    },2000);
}
