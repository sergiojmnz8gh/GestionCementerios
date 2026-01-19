package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.Cementerio;

@Repository
public interface CementerioRepository extends JpaRepository<Cementerio, Integer> {
}