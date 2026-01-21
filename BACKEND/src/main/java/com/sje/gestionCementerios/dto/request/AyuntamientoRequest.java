package com.sje.gestionCementerios.dto.request;

import com.sje.gestionCementerios.entity.Ayuntamiento;
import com.sje.gestionCementerios.entity.Usuario;

import jakarta.validation.Valid;
import lombok.Data;

@Data
public class AyuntamientoRequest {
    @Valid
    private Usuario usuario;

    @Valid
    private Ayuntamiento ayuntamiento;
}
