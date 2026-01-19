package com.sje.gestionCementerios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.CatalogoServicio;

@Repository
public interface CatalogoServicioRepository extends JpaRepository<CatalogoServicio, Integer> {
}