package com.aula.guilherme.service;

import com.aula.guilherme.entities.Obra;
import com.aula.guilherme.repositories.AvaliacaoRepository;
import com.aula.guilherme.repositories.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ObraService {
    
    @Autowired
    private ObraRepository obraRepository;
    
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;
    
    public List<Obra> listarTodas() {
        List<Obra> obras = obraRepository.findAllWithGeneros();
        obras.forEach(obra -> {
            Double media = avaliacaoRepository.findMediaNotaByObraId(obra.getId());
            obra.setNotaMedia(media);
        });
        return obras;
    }
    
    public Optional<Obra> buscarPorId(Long id) {
        Optional<Obra> obra = obraRepository.findById(id);
        obra.ifPresent(o -> {
            Double media = avaliacaoRepository.findMediaNotaByObraId(o.getId());
            o.setNotaMedia(media);
        });
        return obra;
    }
    
    public Obra salvar(Obra obra) {
        return obraRepository.save(obra);
    }
}