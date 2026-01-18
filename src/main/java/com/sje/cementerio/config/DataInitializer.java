package com.sje.cementerio.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sje.cementerio.entity.Rol;
import com.sje.cementerio.entity.Usuario;
import com.sje.cementerio.repository.RolRepository;
import com.sje.cementerio.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (rolRepository.findByNombre("ADMIN").isEmpty()) {
            Rol adminRol = new Rol();
            adminRol.setNombre("ADMIN");
            rolRepository.save(adminRol);

            if (usuarioRepository.findByEmail("admin@cementerio.com").isEmpty()) {
                Usuario admin = new Usuario();
                admin.setEmail("admin@cementerio.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRol(adminRol);
                usuarioRepository.save(admin);
            }
        }

        if (rolRepository.findByNombre("AYUNTAMIENTO").isEmpty()) {
            Rol ayuntamientoRol = new Rol();
            ayuntamientoRol.setNombre("AYUNTAMIENTO");
            rolRepository.save(ayuntamientoRol);
        }

        if (rolRepository.findByNombre("CIUDADANO").isEmpty()) {
            Rol ciudadanoRol = new Rol();
            ciudadanoRol.setNombre("CIUDADANO");
            rolRepository.save(ciudadanoRol);
        }
    }
}