package com.sje.gestionCementerios.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.Ayuntamiento;

@Repository
public interface AyuntamientoRepository extends JpaRepository<Ayuntamiento, Integer> {
    Optional<Ayuntamiento> findByUsuario_Email(String email);
}