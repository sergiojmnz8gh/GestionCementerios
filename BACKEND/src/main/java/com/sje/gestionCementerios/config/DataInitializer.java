package com.sje.gestionCementerios.config;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sje.gestionCementerios.entity.Ayuntamiento;
import com.sje.gestionCementerios.entity.Cementerio;
import com.sje.gestionCementerios.entity.Ciudadano;
import com.sje.gestionCementerios.entity.Concesion;
import com.sje.gestionCementerios.entity.Rol;
import com.sje.gestionCementerios.entity.Usuario;
import com.sje.gestionCementerios.repository.AyuntamientoRepository;
import com.sje.gestionCementerios.repository.CementerioRepository;
import com.sje.gestionCementerios.repository.CiudadanoRepository;
import com.sje.gestionCementerios.repository.ConcesionRepository;
import com.sje.gestionCementerios.repository.RolRepository;
import com.sje.gestionCementerios.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final AyuntamientoRepository ayuntamientoRepository;
    private final CiudadanoRepository ciudadanoRepository;
    private final CementerioRepository cementerioRepository;
    private final ConcesionRepository concesionRepository;

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

        if (ayuntamientoRepository.findAll().isEmpty()) {
            Rol aytoRol = rolRepository.findByNombre("AYUNTAMIENTO").get();

            Usuario userAyto = new Usuario();
            userAyto.setEmail("aytotorredelcampo@gecen.com");
            userAyto.setPassword(passwordEncoder.encode("ayto123"));
            userAyto.setRol(aytoRol);
            usuarioRepository.save(userAyto);

            Ayuntamiento ayto = new Ayuntamiento();
            ayto.setLocalidad("TORREDELCAMPO");
            ayto.setProvincia("JAÉN");  
            ayto.setUsuario(userAyto);
            ayto.setLogoUrl("1.png");
            ayto.setTelefono("953123456");
            ayuntamientoRepository.save(ayto);

            Cementerio cem = new Cementerio();
            cem.setNombre("Cementerio Municipal de Torredelcampo");
            cem.setDireccion("Calle perdida km1");
            cem.setFotoAereaUrl("1.jpg");
            cem.setAyuntamiento(ayto);
            cementerioRepository.save(cem);

            Rol ciudadanoRol = rolRepository.findByNombre("CIUDADANO").get();
            Usuario userCiudadano = new Usuario();
            userCiudadano.setEmail("jimenezelichesergio@gmail.com");
            userCiudadano.setPassword(passwordEncoder.encode("user123"));
            userCiudadano.setRol(ciudadanoRol);
            usuarioRepository.save(userCiudadano);

            Ciudadano ciudadano = new Ciudadano();
            ciudadano.setNombre("Sergio");
            ciudadano.setApellidos("Jiménez");
            ciudadano.setDni("77690216B");
            ciudadano.setDireccion("Calle Manuel Pancorbo");
            ciudadano.setTelefono("699666123");
            ciudadano.setFechaNacimiento(LocalDate.of(2001, 11, 8));
            ciudadano.setLocalidad("TORREDELCAMPO");
            ciudadano.setProvincia("JAÉN");
            ciudadano.setUsuario(userCiudadano);
            ciudadanoRepository.save(ciudadano);

            Concesion concesion = new Concesion();
            concesion.setCiudadano(ciudadano);
            concesion.setFechaCompra(LocalDate.now());
            concesion.setFechaFin(LocalDate.now().plusYears(50));
            concesion.setPrecioFinal(new BigDecimal("2000.00"));
            concesionRepository.save(concesion);
        }
    }
}