package com.fitness.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fitness.modelo.Localidad;

public interface ILocalidadRepository extends JpaRepository<Localidad,Long> {

	@Query("select l from Localidad l where l.Provincia.IdProvincia=?1")
    public List<Localidad> listarLocalidadesPorProvincia(Long idProvincia);
}
