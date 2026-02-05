package com.sje.gestionCementerios.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sje.gestionCementerios.dto.request.AyuntamientoRequest;
import com.sje.gestionCementerios.dto.request.CiudadanoRequest;
import com.sje.gestionCementerios.dto.request.LoginRequest;
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
    public ResponseEntity<TokenResponse> register(@RequestBody @Valid CiudadanoRequest registroCiudadanoDTO) {

        Usuario usuario = authService.registrarCiudadano(registroCiudadanoDTO);
        String token = jwtService.generateToken(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new TokenResponse(token));
    }

    @PostMapping("/registrar/ayuntamiento")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TokenResponse> register(@ModelAttribute @Valid AyuntamientoRequest registroAyuntamientoDTO, @RequestPart("logo") MultipartFile logo) {

        Usuario usuario = authService.registrarAyuntamiento(registroAyuntamientoDTO, logo);
        String token = jwtService.generateToken(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new TokenResponse(token));
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