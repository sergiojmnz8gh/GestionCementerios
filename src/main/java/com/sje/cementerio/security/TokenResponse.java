package com.sje.cementerio.security;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TokenResponse {

    private final String token;

    public String getToken() {
        return token;
    }
}