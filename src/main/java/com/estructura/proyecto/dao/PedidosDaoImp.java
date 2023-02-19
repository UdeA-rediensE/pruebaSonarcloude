package com.estructura.proyecto.dao;

import com.estructura.proyecto.models.Pedido;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class PedidosDaoImp implements PedidosDao{


    @PersistenceContext
    EntityManager entityManager;
    @Override
    @Transactional
    public List<Pedido> getPedidos() {
        String query = "FROM Pedido";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void registrarPedido(Pedido pedido) {
        entityManager.merge(pedido);
    }

    @Override
    public void eliminar(Long id) {
        Pedido pedido = entityManager.find(Pedido.class, id);
        entityManager.remove(pedido);
    }
}
