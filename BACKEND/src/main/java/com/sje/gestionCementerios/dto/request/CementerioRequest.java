package com.sje.gestionCementerios.dto.request;

import com.sje.gestionCementerios.entity.Ayuntamiento;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CementerioRequest {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "La dirección es obligatoria")
    private String direccion;

    private Ayuntamiento ayuntamiento;
}
