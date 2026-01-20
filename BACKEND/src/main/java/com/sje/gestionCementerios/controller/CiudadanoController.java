package com.sje.gestionCementerios.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sje.gestionCementerios.entity.Ciudadano;
import com.sje.gestionCementerios.service.CiudadanoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ciudadano")
@CrossOrigin(origins = "http://localhost:4200")
public class CiudadanoController {

    private CiudadanoService ciudadanoService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Ciudadano>> listarTodos() {
        return ResponseEntity.ok(ciudadanoService.buscarTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<Ciudadano> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(ciudadanoService.buscarPorId(id));
    }
}
