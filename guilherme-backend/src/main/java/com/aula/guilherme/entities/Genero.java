package com.aula.guilherme.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "generos")
@Data
public class Genero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
}