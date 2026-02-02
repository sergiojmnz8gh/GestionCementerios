package com.sje.gestionCementerios.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class ConcesionRequest {
    private LocalDate fechaCompra;
    private LocalDate fechaFin;
    private BigDecimal precioFinal;
}
