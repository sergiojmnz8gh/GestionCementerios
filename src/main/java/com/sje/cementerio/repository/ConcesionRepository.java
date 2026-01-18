package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.Concesion;

@Repository
public interface ConcesionRepository extends JpaRepository<Concesion, Integer> {
}