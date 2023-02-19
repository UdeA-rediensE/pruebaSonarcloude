// Call the dataTables jQuery plugin
$(document).ready(function () {
    $('#pedidos').DataTable();
    cargarPedidos()

});


async function cargarPedidos() {
    const query = await fetch('api/pedidos', {
        method: 'GET',
        headers: getHeaders(),
    });
    const pedidos = await query.json();
    console.log(pedidos);


    let listadoHTML = '';

    for (let pedido of pedidos) {
        let botonEliminar = '<a href="#" onclick="eliminarPedido(' + pedido.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
        let pedidoHTML = '<tr><td>' + pedido.id + '</td><td>' + pedido.producto + '</td><td>' + pedido.precio + '</td><td>' + pedido.cantidad + '</td><td>' + pedido.total + '</td><td>' + botonEliminar + '</td></tr>';
        listadoHTML += pedidoHTML;
    }
    document.querySelector('#pedidos tbody').outerHTML = listadoHTML;

}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}

async function eliminarPedido(id) {
    if (!confirm('¿Desea eliminar este pedido?')) {
        return;
    }
    const request = await fetch('api/pedidos/' + id, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    location.reload();
}



