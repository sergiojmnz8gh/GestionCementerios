package com.sje.gestionCementerios.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class ConcesionResponse {
    private Integer id;
    private LocalDate fechaCompra;
    private LocalDate fechaFin;
    private BigDecimal precioFinal;
    private String ciudadano;
    private Integer parcelas[];
}
