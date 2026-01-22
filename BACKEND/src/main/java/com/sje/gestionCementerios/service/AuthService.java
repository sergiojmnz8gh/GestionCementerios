package com.sje.gestionCementerios.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sje.gestionCementerios.dto.mapper.AyuntamientoMapper;
import com.sje.gestionCementerios.dto.mapper.CiudadanoMapper;
import com.sje.gestionCementerios.dto.request.AyuntamientoRequest;
import com.sje.gestionCementerios.dto.request.CiudadanoRequest;
import com.sje.gestionCementerios.entity.Ayuntamiento;
import com.sje.gestionCementerios.entity.Ciudadano;
import com.sje.gestionCementerios.entity.Rol;
import com.sje.gestionCementerios.entity.Usuario;
import com.sje.gestionCementerios.repository.AyuntamientoRepository;
import com.sje.gestionCementerios.repository.CiudadanoRepository;
import com.sje.gestionCementerios.repository.RolRepository;
import com.sje.gestionCementerios.repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final CiudadanoRepository ciudadanoRepository;
    private final AyuntamientoRepository ayuntamientoRepository;
    private final AyuntamientoMapper ayuntamientoMapper;
    private final CiudadanoMapper ciudadanoMapper;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final LogoService logoService;

    @Transactional
    public Usuario registrarCiudadano(CiudadanoRequest registroCiudadanoDTO) {
        
        Ciudadano ciudadano = ciudadanoMapper.toEntity(registroCiudadanoDTO);

        if (ciudadano.getDni() != null) {
            ciudadano.setDni(ciudadano.getDni().toUpperCase());
        }

        Usuario usuario = ciudadano.getUsuario();
        
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya está en uso");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        Rol rolCiudadano = rolRepository.findByNombre("CIUDADANO")
                .orElseThrow(() -> new RuntimeException("Rol CIUDADANO no encontrado"));
        usuario.setRol(rolCiudadano);
        
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        ciudadano.setUsuario(usuarioGuardado);
        ciudadanoRepository.save(ciudadano);

        return usuarioGuardado;
    }

    @Transactional
    public Usuario registrarAyuntamiento(AyuntamientoRequest registroAyuntamientoDTO, MultipartFile logo) {

        Ayuntamiento ayuntamiento = ayuntamientoMapper.toEntity(registroAyuntamientoDTO);
        Usuario usuario = ayuntamiento.getUsuario();

        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya está en uso");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        Rol rolAyto = rolRepository.findByNombre("AYUNTAMIENTO")
                .orElseThrow(() -> new RuntimeException("Rol AYUNTAMIENTO no encontrado"));
        usuario.setRol(rolAyto);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        ayuntamiento.setUsuario(usuarioGuardado);

        if (logo != null && !logo.isEmpty()) {
        String nombreArchivo = logoService.guardar(logo, ayuntamiento.getId());
            ayuntamiento.setLogoUrl(nombreArchivo);
        }

        ayuntamientoRepository.save(ayuntamiento);

        return usuarioGuardado;
    }
}