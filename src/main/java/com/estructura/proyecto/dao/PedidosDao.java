package com.estructura.proyecto.dao;

import com.estructura.proyecto.models.Pedido;

import java.util.List;

public interface PedidosDao {

    List<Pedido> getPedidos();

    void registrarPedido(Pedido pedido);

    void eliminar (Long id);
}
