package com.sje.gestionCementerios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sje.gestionCementerios.entity.Pago;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Integer> {
}