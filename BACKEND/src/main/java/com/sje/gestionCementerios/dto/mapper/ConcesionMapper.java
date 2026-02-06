package com.sje.gestionCementerios.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.sje.gestionCementerios.dto.request.ConcesionRequest;
import com.sje.gestionCementerios.dto.response.ConcesionResponse;
import com.sje.gestionCementerios.entity.Concesion;
import com.sje.gestionCementerios.entity.Parcela;

@Mapper(componentModel = "spring")
public interface ConcesionMapper {
    @Mapping(target = "parcelas", source = "parcelas")
    @Mapping(target = "ciudadano", source = "ciudadano.nombre")
    ConcesionResponse toResponseDTO(Concesion concesion);

    default Integer[] mapParcelas(List<Parcela> parcelas) {
        if (parcelas == null) return new Integer[0];
        return parcelas.stream()
                .map(Parcela::getId)
                .toArray(Integer[]::new);
    }

    Concesion toEntity(ConcesionRequest concesionRequest);
}