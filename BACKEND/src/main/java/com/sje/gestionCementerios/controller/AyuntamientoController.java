package com.sje.gestionCementerios.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sje.gestionCementerios.dto.response.AyuntamientoResponse;
import com.sje.gestionCementerios.service.AyuntamientoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ayuntamiento")
@CrossOrigin(origins = "http://localhost:4200")
public class AyuntamientoController {

    private final AyuntamientoService ayuntamientoService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AyuntamientoResponse>> listarTodos() {
        return ResponseEntity.ok(ayuntamientoService.buscarTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<AyuntamientoResponse> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(ayuntamientoService.buscarPorId(id));
    }
}