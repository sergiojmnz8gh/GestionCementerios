package com.sje.gestionCementerios.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.sje.gestionCementerios.dto.request.AyuntamientoRequest;
import com.sje.gestionCementerios.dto.response.AyuntamientoResponse;
import com.sje.gestionCementerios.entity.Ayuntamiento;

@Mapper(componentModel = "spring")
public interface AyuntamientoMapper {
    @Mapping(target = "email", source = "usuario.email")
    AyuntamientoResponse toResponseDTO(Ayuntamiento ayuntamiento);

    @Mapping(target = "usuario.email", source = "email")
    @Mapping(target = "usuario.password", source = "password")
    Ayuntamiento toEntity(AyuntamientoRequest ayuntamientoRequest);
}
