package com.aula.guilherme.controllers;

import com.aula.guilherme.entities.Avaliacao;
import com.aula.guilherme.repositories.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
@CrossOrigin(origins = "http://localhost:4200")
public class AvaliacaoController {
    
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;
    
    @GetMapping("/obra/{obraId}")
    public List<Avaliacao> listarPorObra(@PathVariable Long obraId) {
        return avaliacaoRepository.findByObraId(obraId);
    }
    
    @PostMapping
    public Avaliacao criar(@RequestBody Avaliacao avaliacao) {
        return avaliacaoRepository.save(avaliacao);
    }
}