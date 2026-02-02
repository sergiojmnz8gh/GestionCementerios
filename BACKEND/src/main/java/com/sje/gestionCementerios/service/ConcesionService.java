package com.sje.gestionCementerios.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sje.gestionCementerios.dto.mapper.ConcesionMapper;
import com.sje.gestionCementerios.dto.response.ConcesionResponse;
import com.sje.gestionCementerios.repository.ConcesionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConcesionService {

    private final ConcesionRepository concesionRepository;
    private final ConcesionMapper concesionMapper;

    public List<ConcesionResponse> buscarTodas() {
        return concesionRepository.findAll()
            .stream()
            .map(concesionMapper::toResponseDTO)
            .toList();
    }

    public void eliminar(Integer id) {
        concesionRepository.deleteById(id);
    }
}
