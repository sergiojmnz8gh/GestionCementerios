package com.sje.gestionCementerios.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.sje.gestionCementerios.dto.request.CiudadanoRequest;
import com.sje.gestionCementerios.dto.response.CiudadanoResponse;
import com.sje.gestionCementerios.entity.Ciudadano;

@Mapper(componentModel = "spring")
public interface CiudadanoMapper {
    @Mapping(target = "email", source = "usuario.email")
    CiudadanoResponse toResponseDTO(Ciudadano ciudadano);

    @Mapping(target = "usuario.email", source = "email")
    @Mapping(target = "usuario.password", source = "password")
    Ciudadano toEntity(CiudadanoRequest ciudadanoRequest);
}