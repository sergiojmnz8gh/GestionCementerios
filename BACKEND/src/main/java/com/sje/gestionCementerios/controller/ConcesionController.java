package com.sje.gestionCementerios.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sje.gestionCementerios.dto.response.ConcesionResponse;
import com.sje.gestionCementerios.service.ConcesionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/concesion")
@CrossOrigin(origins = "http://localhost:4200")
public class ConcesionController {

    private final ConcesionService concesionService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ConcesionResponse>> listarTodos() {
        return ResponseEntity.ok(concesionService.buscarTodas());
    }
}
