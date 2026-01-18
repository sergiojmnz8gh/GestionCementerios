package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.Difunto;

@Repository
public interface DifuntoRepository extends JpaRepository<Difunto, Integer> {
}