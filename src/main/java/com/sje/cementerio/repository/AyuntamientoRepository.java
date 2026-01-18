package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.Ayuntamiento;

@Repository
public interface AyuntamientoRepository extends JpaRepository<Ayuntamiento, Integer> {
}