package com.sje.gestionCementerios.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sje.gestionCementerios.dto.mapper.CiudadanoMapper;
import com.sje.gestionCementerios.dto.response.CiudadanoResponse;
import com.sje.gestionCementerios.repository.CiudadanoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CiudadanoService {

    private final CiudadanoRepository ciudadanoRepository;
    private final CiudadanoMapper ciudadanoMapper;

    public List<CiudadanoResponse> buscarTodos() {
        return ciudadanoRepository.findAll()
            .stream()
            .map(ciudadanoMapper::toResponseDTO)
            .toList();
    }

    public CiudadanoResponse buscarPorId(Integer id) {
        return ciudadanoRepository.findById(id)
        .map(ciudadanoMapper::toResponseDTO)
        .orElseThrow();
    }
}
