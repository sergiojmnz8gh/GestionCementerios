package com.sje.cementerio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.cementerio.entity.Ciudadano;

@Repository
public interface CiudadanoRepository extends JpaRepository<Ciudadano, Integer> {
    
}