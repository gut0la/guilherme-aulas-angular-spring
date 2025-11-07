package com.aula.guilherme.repositories;

import com.aula.guilherme.entities.Obra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObraRepository extends JpaRepository<Obra, Long> {
    @Query("SELECT o FROM Obra o LEFT JOIN FETCH o.generos")
    List<Obra> findAllWithGeneros();
}