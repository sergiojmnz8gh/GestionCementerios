package com.sje.gestionCementerios.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
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

    public CiudadanoResponse obtenerPerfilActual() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return ciudadanoRepository.findByUsuario_Email(email)
                .map(ciudadanoMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Perfil no encontrado"));
    }

    public CiudadanoResponse actualizar(Integer id, CiudadanoResponse ciudadano) {
        return ciudadanoRepository.findById(id)
            .map(existente -> {
                existente.getUsuario().setEmail(ciudadano.getEmail());
                existente.setDni(ciudadano.getDni());
                existente.setNombre(ciudadano.getNombre());
                existente.setApellidos(ciudadano.getApellidos());
                existente.setTelefono(ciudadano.getTelefono());
                existente.setFechaNacimiento(ciudadano.getFechaNacimiento());
                existente.setProvincia(ciudadano.getProvincia());
                existente.setLocalidad(ciudadano.getLocalidad());
                existente.setDireccion(ciudadano.getDireccion());
                return ciudadanoRepository.save(existente);
            })
            .map(ciudadanoMapper::toResponseDTO)
            .orElseThrow();
    }

    public void eliminar(Integer id) {
        ciudadanoRepository.deleteById(id);
    }
}
