package com.fitness.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fitness.modelo.Provincia;

public interface IProvinciaRepository extends JpaRepository<Provincia, Long> {
	
	   @Query("select p from Provincia p where p.Pais.IdPais=?1")
	   public List<Provincia> listarProvinciasPorPais(Long idPais);
}
