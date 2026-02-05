package com.sje.gestionCementerios.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.Ciudadano;

@Repository
public interface CiudadanoRepository extends JpaRepository<Ciudadano, Integer> {
    Optional<Ciudadano> findByUsuario_Email(String email);
}