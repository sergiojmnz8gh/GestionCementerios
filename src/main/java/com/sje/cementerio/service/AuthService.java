package com.sje.cementerio.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sje.cementerio.entity.Ayuntamiento;
import com.sje.cementerio.entity.Ciudadano;
import com.sje.cementerio.entity.Rol;
import com.sje.cementerio.entity.Usuario;
import com.sje.cementerio.repository.AyuntamientoRepository;
import com.sje.cementerio.repository.CiudadanoRepository;
import com.sje.cementerio.repository.RolRepository;
import com.sje.cementerio.repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final CiudadanoRepository ciudadanoRepository;
    private final AyuntamientoRepository ayuntamientoRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Usuario registrarCiudadano(Usuario usuario, Ciudadano datosCiudadano) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya está en uso");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        Rol rolCiudadano = rolRepository.findByNombre("USUARIO")
                .orElseThrow(() -> new RuntimeException("Rol USUARIO no encontrado"));
        usuario.setRol(rolCiudadano);
        
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        datosCiudadano.setUsuario(usuarioGuardado);
        ciudadanoRepository.save(datosCiudadano);

        return usuarioGuardado;
    }

    @Transactional
    public Usuario registrarAyuntamiento(Usuario usuario, Ayuntamiento datosAyto) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya está en uso");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        Rol rolAyto = rolRepository.findByNombre("AYUNTAMIENTO")
                .orElseThrow(() -> new RuntimeException("Rol AYUNTAMIENTO no encontrado"));
        usuario.setRol(rolAyto);
        
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        datosAyto.setUsuario(usuarioGuardado);
        ayuntamientoRepository.save(datosAyto);

        return usuarioGuardado;
    }
}