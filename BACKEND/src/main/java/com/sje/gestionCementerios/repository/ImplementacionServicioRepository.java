package com.sje.gestionCementerios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.ImplementacionServicio;

@Repository
public interface ImplementacionServicioRepository extends JpaRepository<ImplementacionServicio, Integer> {
}