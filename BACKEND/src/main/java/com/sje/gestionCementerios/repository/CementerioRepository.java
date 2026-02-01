package com.sje.gestionCementerios.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.Cementerio;

@Repository
public interface CementerioRepository extends JpaRepository<Cementerio, Integer> {
    List<Cementerio> findByAyuntamiento_Localidad(String localidad);
}