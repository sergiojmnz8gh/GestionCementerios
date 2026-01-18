package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.CatalogoServicio;

@Repository
public interface CatalogoServicioRepository extends JpaRepository<CatalogoServicio, Integer> {
}