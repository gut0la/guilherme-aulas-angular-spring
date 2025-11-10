package com.aula.guilherme.repositories;

import com.aula.guilherme.entities.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findByObraId(Long obraId);

    List<Avaliacao> findByUsuarioId(Long usuarioId);
    
    @Query("SELECT AVG(a.nota) FROM Avaliacao a WHERE a.obra.id = :obraId")
    Double findMediaNotaByObraId(Long obraId);
}