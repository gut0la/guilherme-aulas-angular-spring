package com.aula.guilherme.controllers;

import com.aula.guilherme.entities.Produto;
import com.aula.guilherme.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

// OS CONTROLLERS SERVE PARA RECEBER AS REQUISIÇÕES E RETORNAR UMA RESPOSTA
// OU SEJA ELE VAI RECEBER A REQUISIÇÃO DO USUÁRIO E RETORNAR UMA RESPOSTA
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired // AUTOWIRED SERVE PARA INJETAR A DEPENDENCIA OU SEJA ELE VAI CRIAR UMA INSTANCIA DO OBJETO
    ProdutoService produtoService;

    @GetMapping("/produto")
    public Produto criarProduto(
            @RequestParam String nome, // REQUESTPARAM SERVE PARA PEGAR O VALOR DA URL
            @RequestParam Double preco
    ) {
        // RETORNA O OBJETO CRIADO PELO SERVICE
        return produtoService.criarProduto(nome, preco);
    }
}
