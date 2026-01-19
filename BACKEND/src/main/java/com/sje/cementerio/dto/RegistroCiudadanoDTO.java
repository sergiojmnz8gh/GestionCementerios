package com.sje.cementerio.dto;

import com.sje.cementerio.entity.Ciudadano;
import com.sje.cementerio.entity.Usuario;

import jakarta.validation.Valid;
import lombok.Data;

@Data
public class RegistroCiudadanoDTO {
    @Valid
    private Usuario usuario;
    
    @Valid
    private Ciudadano ciudadano;
}