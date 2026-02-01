package com.sje.gestionCementerios.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sje.gestionCementerios.dto.mapper.CementerioMapper;
import com.sje.gestionCementerios.dto.response.CementerioResponse;
import com.sje.gestionCementerios.repository.CementerioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CementerioService {

    private final CementerioRepository cementerioRepository;
    private final CementerioMapper cementerioMapper;

    public List<CementerioResponse> buscarTodos() {
        return cementerioRepository.findAll()
            .stream()
            .map(cementerioMapper::toResponseDTO)
            .toList();
    }

    public CementerioResponse buscarPorId(Integer id) {
        return cementerioRepository.findById(id)
            .map(cementerioMapper::toResponseDTO)
            .orElseThrow();
    }

    public List<CementerioResponse> buscarPorLocalidad(String localidad) {
        return cementerioRepository.findByAyuntamiento_Localidad(localidad)
            .stream()
            .map(cementerioMapper::toResponseDTO)
            .toList();
    }
}
