package com.sje.gestionCementerios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.Zona;

@Repository
public interface ZonaRepository extends JpaRepository<Zona, Integer> {
}