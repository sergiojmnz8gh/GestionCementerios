package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.TarifaServicio;

@Repository
public interface TarifaServicioRepository extends JpaRepository<TarifaServicio, Integer> {
}