package com.aula.guilherme.config;

import com.aula.guilherme.entities.Genero;
import com.aula.guilherme.entities.Obra;
import com.aula.guilherme.repositories.GeneroRepository;
import com.aula.guilherme.repositories.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private GeneroRepository generoRepository;
    
    @Autowired
    private ObraRepository obraRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (generoRepository.count() == 0) {
            // Criar gêneros
            Genero acao = new Genero();
            acao.setNome("Ação");
            
            Genero drama = new Genero();
            drama.setNome("Drama");
            
            Genero comedia = new Genero();
            comedia.setNome("Comédia");
            
            Genero ficcao = new Genero();
            ficcao.setNome("Ficção Científica");
            
            generoRepository.saveAll(Arrays.asList(acao, drama, comedia, ficcao));
            
            // Criar obras de exemplo
            Obra filme1 = new Obra();
            filme1.setTitulo("Matrix");
            filme1.setDescricao("Um hacker descobre a realidade sobre sua existência.");
            filme1.setAnoLancamento(1999);
            filme1.setTipo(Obra.TipoObra.FILME);
            filme1.setGeneros(Arrays.asList(acao, ficcao));
            
            Obra serie1 = new Obra();
            serie1.setTitulo("Breaking Bad");
            serie1.setDescricao("Um professor de química se torna fabricante de drogas.");
            serie1.setAnoLancamento(2008);
            serie1.setTipo(Obra.TipoObra.SERIE);
            serie1.setGeneros(Arrays.asList(drama));
            
            obraRepository.saveAll(Arrays.asList(filme1, serie1));
        }
    }
}