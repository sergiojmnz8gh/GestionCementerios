package com.sje.cementerio.dto;

import com.sje.cementerio.entity.Ayuntamiento;
import com.sje.cementerio.entity.Usuario;

import jakarta.validation.Valid;
import lombok.Data;

@Data
public class RegistroAyuntamientoDTO {
    @Valid
    private Usuario usuario;

    @Valid
    private Ayuntamiento ayuntamiento;
}
