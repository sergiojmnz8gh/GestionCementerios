package com.sje.gestionCementerios.dto.response;

import lombok.Data;

@Data
public class CementerioResponse {
    private Integer id;
    private String nombre;
    private String direccion;
    private String fotoAereaUrl;
    private String localidadAyuntamiento;
}
