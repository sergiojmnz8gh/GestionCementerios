package com.sje.gestionCementerios.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LogoService {
    private final String DIRECTORY = "uploads/logos/";

    public String guardar(MultipartFile archivo, Integer id) {
        try {
            Path path = Paths.get(DIRECTORY);
            if (!Files.exists(path)) Files.createDirectories(path);

            String extension = StringUtils.getFilenameExtension(archivo.getOriginalFilename());
            String fileName = id + "." + extension;
            
            Path targetPath = path.resolve(fileName);
            Files.copy(archivo.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el logo", e);
        }
    }
}