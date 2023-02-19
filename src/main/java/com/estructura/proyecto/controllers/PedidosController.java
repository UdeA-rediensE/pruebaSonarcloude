package com.estructura.proyecto.controllers;

import com.estructura.proyecto.dao.PedidosDao;
import com.estructura.proyecto.models.Pedido;
import com.estructura.proyecto.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PedidosController {
    @Autowired
    private PedidosDao pedidosDao;
    @Autowired
    private JWTUtil jwtUtil;


    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/pedidos/{id}", method = RequestMethod.GET)
    public Pedido getPedidos(@PathVariable Long id) {
        Pedido pedido = new Pedido();
        pedido.setId(id);
        pedido.setProducto("uvas");
        pedido.setCantidad(2);
        pedido.setPrecio(300);
        pedido.setTotal(pedido.getCantidad() * pedido.getPrecio());
        registrarPedidos(pedido);
        return pedido;

    }

    @RequestMapping(value = "api/pedidos", method = RequestMethod.GET)
    public List<Pedido> getPedidos(@RequestHeader(value = "Authorization") String token) {

        if (!validarToken(token)) {
            return pedidosDao.getPedidos();

        }
        return pedidosDao.getPedidos();
    }

    @RequestMapping(value = "api/pedidos", method = RequestMethod.POST)
    public void registrarPedidos(@RequestBody Pedido pedido) {
        pedidosDao.registrarPedido(pedido);
    }

    @RequestMapping(value = "api/pedidos/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if (!validarToken(token)) {
            return;
        }
        pedidosDao.eliminar(id);
    }
}
