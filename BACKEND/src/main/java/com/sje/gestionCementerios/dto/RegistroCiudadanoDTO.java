package com.sje.gestionCementerios.dto;

import jakarta.validation.Valid;
import lombok.Data;

@Data
public class RegistroCiudadanoDTO {
    @Valid
    private String email;
    
    @Valid
    private String dni;
    
    @Valid
    private String nombre;
    
    @Valid
    private String apellidos;
    
    @Valid
    private String password;
    
    @Valid
    private String telefono;
    
    @Valid
    private String provincia;
    
    @Valid
    private String localidad;

    @Valid
    private String direccion;
}