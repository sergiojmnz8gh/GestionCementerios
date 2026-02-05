package com.sje.gestionCementerios.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sje.gestionCementerios.dto.request.AyuntamientoRequest;
import com.sje.gestionCementerios.dto.response.AyuntamientoResponse;
import com.sje.gestionCementerios.service.AyuntamientoService;

import jakarta.validation.Valid;
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

    @GetMapping("/perfil")
    public ResponseEntity<AyuntamientoResponse> obtenerPerfilActual() {
        return ResponseEntity.ok(ayuntamientoService.obtenerPerfilActual());
    }

    @PutMapping("/actualizar/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<AyuntamientoResponse> actualizar(@PathVariable Integer id, @ModelAttribute @Valid AyuntamientoRequest AyuntamientoDTO, @RequestPart("logo") MultipartFile logo) {
        return ResponseEntity.ok(ayuntamientoService.actualizar(id, AyuntamientoDTO, logo));
    }

    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        ayuntamientoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}