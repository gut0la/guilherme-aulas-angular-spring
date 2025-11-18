package com.aula.guilherme.controllers;

import com.aula.guilherme.entities.Obra;
import com.aula.guilherme.service.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/obras")
@CrossOrigin(origins = "*")
public class ObraController {
    
    @Autowired
    private ObraService obraService;
    
    @GetMapping
    public List<Obra> listarTodas() {
        return obraService.listarTodas();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Obra> buscarPorId(@PathVariable Long id) {
        return obraService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Obra salvar(@RequestBody Obra obra) {
        return obraService.salvar(obra);
    }
}