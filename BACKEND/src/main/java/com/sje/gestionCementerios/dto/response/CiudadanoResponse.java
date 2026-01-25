package com.sje.gestionCementerios.dto.response;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CiudadanoResponse {
    private Integer id;
    private String email;
    private String dni;
    private String nombre;
    private String apellidos;
    private String telefono;
    private LocalDate fechaNacimiento;
    private String provincia;
    private String localidad;
    private String direccion;
}