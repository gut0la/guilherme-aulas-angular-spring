package com.aula.guilherme.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "obras")
@Data
public class Obra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    @Column(name = "ano_lancamento")
    private Integer anoLancamento;
    
    @Enumerated(EnumType.STRING)
    private TipoObra tipo;
    
    @ManyToMany
    @JoinTable(
        name = "obra_generos",
        joinColumns = @JoinColumn(name = "obra_id"),
        inverseJoinColumns = @JoinColumn(name = "genero_id")
    )
    private List<Genero> generos;
    
    @Transient
    private Double notaMedia;
    
    public enum TipoObra {
        FILME, SERIE, ANIME
    }
}