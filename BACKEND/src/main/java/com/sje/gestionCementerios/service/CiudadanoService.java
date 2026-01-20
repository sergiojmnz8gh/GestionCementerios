package com.sje.gestionCementerios.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sje.gestionCementerios.entity.Ciudadano;
import com.sje.gestionCementerios.repository.CiudadanoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CiudadanoService {

    private final CiudadanoRepository ciudadanoRepository;

    public List<Ciudadano> buscarTodos() {
        return ciudadanoRepository.findAll();
    }

    public Ciudadano buscarPorId(Integer id) {
        return ciudadanoRepository.findById(id).orElseThrow();
    }
}
