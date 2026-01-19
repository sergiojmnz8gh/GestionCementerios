package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.ImplementacionServicio;

@Repository
public interface ImplementacionServicioRepository extends JpaRepository<ImplementacionServicio, Integer> {
}