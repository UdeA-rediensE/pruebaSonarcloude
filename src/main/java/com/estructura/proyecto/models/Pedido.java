package com.estructura.proyecto.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "pedidos")
@ToString @EqualsAndHashCode
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name ="id")
    private Long id;
    @Getter @Setter @Column(name ="producto")
    private String producto;
    @Getter @Setter @Column(name ="cantidad")
    private int cantidad;
    @Getter @Setter @Column(name ="precio")
    private int precio;
    @Getter @Setter @Column(name ="total")
    private int total;


}
