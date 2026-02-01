package com.sje.gestionCementerios.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.sje.gestionCementerios.dto.request.CementerioRequest;
import com.sje.gestionCementerios.dto.response.CementerioResponse;
import com.sje.gestionCementerios.entity.Cementerio;

@Mapper(componentModel = "spring")
public interface CementerioMapper {
    @Mapping(target = "localidadAyuntamiento", source = "ayuntamiento.localidad")
    CementerioResponse toResponseDTO(Cementerio cementerio);

    Cementerio toEntity(CementerioRequest cementerioRequest);
}
