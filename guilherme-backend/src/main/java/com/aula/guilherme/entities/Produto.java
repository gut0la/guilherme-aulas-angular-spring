package com.aula.guilherme.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* ISSO É UMA ENTIDADE ELA VAI REPRESENTAR UMA TABELA NO BANCO DE DADOS
* OU SEJA CADA ATRIBUTO VAI SER UMA COLUNA.
 */
@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    // A ANOTAÇÃO @Id INDICA QUE ESSE ATRIBUTO É A CHAVE PRIMÁRIA DA TABELA
    @Id
    private Long id;

    // A ANOTAÇÃO @Column INDICA QUE ESSE ATRIBUTO É UMA COLUNA DA TABELA
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "preco", nullable = false)
    private Double preco;
}
