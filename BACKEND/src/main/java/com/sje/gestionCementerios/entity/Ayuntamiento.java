package com.sje.gestionCementerios.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ayuntamiento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ayuntamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    private String localidad;

    @Column(nullable = false, length = 100)
    private String provincia;

    @Column(nullable = false)
    private String config;

    @Column(name = "logo_url")
    private String logoUrl;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @OneToMany(mappedBy = "ayuntamiento", cascade = CascadeType.ALL)
    private List<Cementerio> cementerios;

    public Ayuntamiento(String localidad, String provincia) {
        this.localidad = localidad;
        this.provincia = provincia;
        this.config = null;
        this.logoUrl = null;
        this.cementerios = null;
    }
}