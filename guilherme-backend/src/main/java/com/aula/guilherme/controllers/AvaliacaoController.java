package com.aula.guilherme.controllers;

import com.aula.guilherme.entities.Avaliacao;
import com.aula.guilherme.entities.Obra;
import com.aula.guilherme.entities.Usuario;
import com.aula.guilherme.repositories.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
@CrossOrigin(origins = "*")
public class AvaliacaoController {
    
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;
    
    @GetMapping("/obra/{obraId}")
    public List<Avaliacao> listarPorObra(@PathVariable Long obraId) {
        return avaliacaoRepository.findByObra_Id(obraId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Avaliacao> listarPorUsuario(@PathVariable Long usuarioId) {
        return avaliacaoRepository.findByUsuario_Id(usuarioId);
    }

    @GetMapping("/minhas")
    public List<Avaliacao> listarMinhasAvaliacoes() {
        return avaliacaoRepository.findByUsuario_Id(1L);
    }

    @PostMapping
    public Avaliacao criar(@RequestBody AvaliacaoRequest request) {
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setNota(request.getNota());
        avaliacao.setComentario(request.getComentario());
        
        // Buscar obra e usuário pelos IDs
        Obra obra = new Obra();
        obra.setId(request.getObraId());
        avaliacao.setObra(obra);
        
        Usuario usuario = new Usuario();
        usuario.setId(request.getUsuarioId());
        avaliacao.setUsuario(usuario);
        
        return avaliacaoRepository.save(avaliacao);
    }
    
    public static class AvaliacaoRequest {
        private Integer nota;
        private String comentario;
        private Long obraId;
        private Long usuarioId;
        
        public Integer getNota() { return nota; }
        public void setNota(Integer nota) { this.nota = nota; }
        
        public String getComentario() { return comentario; }
        public void setComentario(String comentario) { this.comentario = comentario; }
        
        public Long getObraId() { return obraId; }
        public void setObraId(Long obraId) { this.obraId = obraId; }
        
        public Long getUsuarioId() { return usuarioId; }
        public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    }
}