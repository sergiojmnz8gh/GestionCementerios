package com.sje.gestionCementerios.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sje.gestionCementerios.dto.LoginRequest;
import com.sje.gestionCementerios.dto.RegistroAyuntamientoDTO;
import com.sje.gestionCementerios.dto.RegistroCiudadanoDTO;
import com.sje.gestionCementerios.entity.Ciudadano;
import com.sje.gestionCementerios.entity.Usuario;
import com.sje.gestionCementerios.security.JwtService;
import com.sje.gestionCementerios.security.TokenResponse;
import com.sje.gestionCementerios.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/registrar/ciudadano")
    public ResponseEntity<Usuario> register(@RequestBody @Valid RegistroCiudadanoDTO registroCiudadanoDTO) {

        Usuario usuario = new Usuario(registroCiudadanoDTO.getEmail(), registroCiudadanoDTO.getPassword());
        Ciudadano ciudadano = new Ciudadano (registroCiudadanoDTO.getDni(),
                                            registroCiudadanoDTO.getNombre(),
                                            registroCiudadanoDTO.getApellidos(),
                                            registroCiudadanoDTO.getTelefono(),
                                            registroCiudadanoDTO.getProvincia(),
                                            registroCiudadanoDTO.getLocalidad(),
                                            registroCiudadanoDTO.getDireccion());

        Usuario usuarioRegistrado = authService.registrarCiudadano(usuario, ciudadano);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRegistrado);
    }

    @PostMapping("/registrar/ayuntamiento")
    public ResponseEntity<Usuario> register(@RequestBody @Valid RegistroAyuntamientoDTO registroAyuntamientoDTO) {

        Usuario usuarioRegistrado = authService.registrarAyuntamiento(registroAyuntamientoDTO.getUsuario(), registroAyuntamientoDTO.getAyuntamiento());
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRegistrado);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        Usuario usuario = (Usuario) authentication.getPrincipal();
        String token = jwtService.generateToken(usuario);

        return ResponseEntity.ok(new TokenResponse(token));
    }
}