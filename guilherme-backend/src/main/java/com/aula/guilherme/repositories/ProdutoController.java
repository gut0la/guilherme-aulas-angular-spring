package com.aula.guilherme.repositories;

import com.aula.guilherme.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// O REPOSITORY é RESPONSÁVEL PELA PARTE DE ACESSO A DADOS
// OU SEJA ELE VAI SER RESPONSÁVEL POR SALVAR, ATUALIZAR, DELETAR E BUSCAR DADOS NO BANCO DE DADOS
@Repository
public interface ProdutoController extends JpaRepository<Produto, Long> {
}
