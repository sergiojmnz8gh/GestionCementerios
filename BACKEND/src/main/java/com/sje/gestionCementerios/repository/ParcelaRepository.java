package com.sje.gestionCementerios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.Parcela;

@Repository
public interface ParcelaRepository extends JpaRepository<Parcela, Integer> {
}