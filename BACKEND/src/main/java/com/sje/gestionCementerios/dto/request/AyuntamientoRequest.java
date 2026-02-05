package com.sje.gestionCementerios.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AyuntamientoRequest {
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Formato de email inválido")
    private String email;

    @NotBlank(message = "La localidad es obligatoria")
    private String localidad;

    @NotBlank(message = "La provincia es obligatoria")
    private String provincia;

    private String password;

    @NotBlank(message = "El teléfono es obligatorio")
    private String telefono;
}