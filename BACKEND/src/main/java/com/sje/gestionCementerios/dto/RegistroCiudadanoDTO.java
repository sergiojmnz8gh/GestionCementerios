package com.sje.gestionCementerios.dto;

import com.sje.gestionCementerios.entity.Ciudadano;
import com.sje.gestionCementerios.entity.Usuario;

import jakarta.validation.Valid;
import lombok.Data;

@Data
public class RegistroCiudadanoDTO {
    @Valid
    private Usuario usuario;
    
    @Valid
    private Ciudadano ciudadano;
}