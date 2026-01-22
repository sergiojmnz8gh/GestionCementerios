package com.sje.gestionCementerios.dto.response;

import lombok.Data;

@Data
public class AyuntamientoResponse {
    private Integer id;
    private String email;
    private String localidad;
    private String provincia;
    private String config;
    private String logoUrl;
}
