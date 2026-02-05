package com.sje.gestionCementerios.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sje.gestionCementerios.dto.mapper.AyuntamientoMapper;
import com.sje.gestionCementerios.dto.request.AyuntamientoRequest;
import com.sje.gestionCementerios.dto.response.AyuntamientoResponse;
import com.sje.gestionCementerios.repository.AyuntamientoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AyuntamientoService {

    private final AyuntamientoRepository ayuntamientoRepository;
    private final AyuntamientoMapper ayuntamientoMapper;
    private final LogoService logoService;

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

    public AyuntamientoResponse obtenerPerfilActual() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return ayuntamientoRepository.findByUsuario_Email(email)
                .map(ayuntamientoMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Perfil no encontrado"));
    }

    public AyuntamientoResponse actualizar(Integer id, AyuntamientoRequest ayuntamientoDTO, MultipartFile logo) {
    return ayuntamientoRepository.findById(id)
        .map(existente -> {
            existente.getUsuario().setEmail(ayuntamientoDTO.getEmail());
            
            existente.setProvincia(ayuntamientoDTO.getProvincia());
            existente.setLocalidad(ayuntamientoDTO.getLocalidad());
            existente.setTelefono(ayuntamientoDTO.getTelefono());

            if (logo != null && !logo.isEmpty()) {
                String nombreArchivo = logoService.guardar(logo, existente.getId());
                existente.setLogoUrl(nombreArchivo);
            }

            return ayuntamientoRepository.save(existente);
        })
        .map(ayuntamientoMapper::toResponseDTO)
        .orElseThrow(() -> new RuntimeException("Ayuntamiento no encontrado con id: " + id));
}

    public void eliminar(Integer id) {
        ayuntamientoRepository.deleteById(id);
    }
}
