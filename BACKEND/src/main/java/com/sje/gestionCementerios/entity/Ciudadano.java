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
@Table(name = "ciudadano")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ciudadano {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Column(nullable = false, length = 20)
    private String telefono;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable = false, length = 50)
    private String localidad;

    @Column(nullable = false, length = 100)
    private String provincia;

    @Column(nullable = false, length = 20)
    private String dni;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @OneToMany(mappedBy = "ciudadano", cascade = CascadeType.ALL)
    private List<Concesion> concesiones;

    public Ciudadano(String dni, String nombre, String apellidos, String telefono, String provincia, String localidad, String direccion) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.provincia = provincia;
        this.localidad = localidad;
        this.direccion = direccion;
        this.concesiones = null;
    }
}