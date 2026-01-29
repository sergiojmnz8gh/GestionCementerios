package com.sje.gestionCementerios.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sje.gestionCementerios.dto.mapper.AyuntamientoMapper;
import com.sje.gestionCementerios.dto.response.AyuntamientoResponse;
import com.sje.gestionCementerios.repository.AyuntamientoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AyuntamientoService {

    private final AyuntamientoRepository ayuntamientoRepository;
    private final AyuntamientoMapper ayuntamientoMapper;

    public List<AyuntamientoResponse> buscarTodos() {
        return ayuntamientoRepository.findAll()
            .stream()
            .map(ayuntamientoMapper::toResponseDTO)
            .toList();
    }

    public AyuntamientoResponse buscarPorId(Integer id) {
        return ayuntamientoRepository.findById(id)
            .map(ayuntamientoMapper::toResponseDTO)
            .orElseThrow();
    }

    public AyuntamientoResponse actualizar(Integer id, AyuntamientoResponse ayuntamiento) {
        return ayuntamientoRepository.findById(id)
            .map(existente -> {
                existente.getUsuario().setEmail(ayuntamiento.getEmail());
                existente.setLogoUrl(ayuntamiento.getLogoUrl());
                existente.setProvincia(ayuntamiento.getProvincia());
                existente.setLocalidad(ayuntamiento.getLocalidad());
                return ayuntamientoRepository.save(existente);
            })
            .map(ayuntamientoMapper::toResponseDTO)
            .orElseThrow();
    }

    public void eliminar(Integer id) {
        ayuntamientoRepository.deleteById(id);
    }
}
