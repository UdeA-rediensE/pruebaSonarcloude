// Call the dataTables jQuery plugin
$(document).ready(function () {
    cargarUsuarios()
    botonLogin();
    actualizarEmailUsuario();
    $('#usuarios').DataTable();
});


function actualizarEmailUsuario() {
    if (localStorage.length == 0) {
        document.getElementById('txt-email-usuario').innerText = 'Sesion no iniciada';

    } else {
        document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
    }
}

async function cargarUsuarios() {
    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders(),
    });
    const usuarios = await request.json();
    console.log(usuarios);


    let listadoHTML = '';
    for (let usuario of usuarios) {
        let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
        let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono;
        let usuarioHTML = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>' + usuario.email + '</td><td>' + telefonoTexto + '</td><td>' + botonEliminar + '</td></tr>';
        listadoHTML += usuarioHTML;
    }
    document.querySelector('#usuarios tbody').outerHTML = listadoHTML;

}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}

async function eliminarUsuario(id) {
    if (!confirm('¿Desea eliminar este usuario?')) {
        return;
    }
    const request = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    location.reload();
}

async function botonLogin() {

    if (localStorage.getItem("email") != null) {
        document.getElementById("texto").href = '#logoutModal';
        document.getElementById("texto").innerHTML = 'Logout';
    } else {
        document.getElementById("texto").href = 'login.html';
        document.getElementById("texto").innerHTML = 'Login';
    }
}


