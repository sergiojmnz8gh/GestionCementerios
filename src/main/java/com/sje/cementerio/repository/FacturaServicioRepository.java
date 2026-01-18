package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.FacturaServicio;

@Repository
public interface FacturaServicioRepository extends JpaRepository<FacturaServicio, Integer> {
}