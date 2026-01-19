package com.sje.cementerio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cementerio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cementerio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false)
    private String direccion;

    @Column(name = "foto_aerea_url", nullable = false)
    private String fotoAereaUrl;

    @ManyToOne
    @JoinColumn(name = "ayuntamiento_id", nullable = false)
    private Ayuntamiento ayuntamiento;
}