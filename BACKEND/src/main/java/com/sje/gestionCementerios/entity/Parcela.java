package com.sje.gestionCementerios.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "parcela")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Parcela {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String numero;

    @Column(name = "coordenadas_poligono", length = 1000)
    private String coordenadasPoligono;

    @Column(length = 20)
    private String estado; // 'LIBRE', 'OCUPADO'

    @Column(name = "foto_lapida_url")
    private String fotoLapidaUrl;

    @ManyToOne
    @JoinColumn(name = "zona_id", nullable = false)
    private Zona zona;

    @ManyToOne
    @JoinColumn(name = "concesion_id")
    private Concesion concesion;

    @OneToMany(mappedBy = "parcela", cascade = CascadeType.ALL)
    private List<Difunto> difuntos;
}