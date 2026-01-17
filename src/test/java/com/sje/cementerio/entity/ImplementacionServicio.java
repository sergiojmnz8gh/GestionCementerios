package com.sje.cementerio.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "implementacion_servicio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImplementacionServicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fecha_realizacion", nullable = false)
    private LocalDate fechaRealizacion;

    @Column(nullable = false, length = 20)
    private String estado; // 'PENDIENTE', 'REALIZADO'

    @ManyToOne
    @JoinColumn(name = "parcela_id", nullable = false)
    private Parcela parcela;

    @ManyToOne
    @JoinColumn(name = "tarifa_id", nullable = false)
    private TarifaServicio tarifa;

    @ManyToOne
    @JoinColumn(name = "factura_id")
    private FacturaServicio factura;
}