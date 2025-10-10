package com.aula.guilherme.service;

import com.aula.guilherme.entities.Produto;
import org.springframework.stereotype.Service;

/*
* O SERVICE é RESPONSÁVEL PELA REGRA DE NEGÓCIO
* OU SEJA ELE VAI TER AS REGRAS DE NEGÓCIO KKK
* IMAGINE QUE VC TEM UMA LOJA ELA VAI TER PRODUTOS
* ENTÃO VC PODE TER UMA REGRA DE NEGÓCIO
* QUE DIZ QUE O PREÇO DO PRODUTO NÃO PODE SER MENOR QUE 0
* ENTÃO VC PODE COLOCAR ESSA REGRA DE NEGÓCIO NO SERVICE
* ELA VAI SER RESPONSÁVEL POR ISSO.
 */
@Service
public class ProdutoService {
    public Produto criarProduto(String nome, Double preco) {
        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setPreco(preco);
        return produto;
    }
}
