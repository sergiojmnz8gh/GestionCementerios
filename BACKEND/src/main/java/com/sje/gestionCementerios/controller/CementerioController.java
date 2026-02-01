package com.sje.gestionCementerios.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sje.gestionCementerios.dto.response.CementerioResponse;
import com.sje.gestionCementerios.service.CementerioService;

import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cementerio")
@CrossOrigin(origins = "http://localhost:4200")
public class CementerioController {

    private final CementerioService cementerioService;

    @GetMapping("/localidad/{localidad}")
    @PermitAll     
    public ResponseEntity<List<CementerioResponse>> listarPorLocalidad(@PathVariable String localidad) {
        return ResponseEntity.ok(cementerioService.buscarPorLocalidad(localidad));
    }
}
