package com.sje.gestionCementerios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.Difunto;

@Repository
public interface DifuntoRepository extends JpaRepository<Difunto, Integer> {
}