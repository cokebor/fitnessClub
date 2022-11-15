package com.fitness.repositorios;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fitness.modelo.Comprobante;

public interface IComprobanteRepository extends JpaRepository<Comprobante,Long>{
	
	@Query("from Comprobante c where c.Usuario.IdUsuario=?1")
	public List<Comprobante> listarPorUsuario(Long idUsuario);
	
	@Query("from Comprobante c where c.Usuario.IdUsuario=?1")
	public Page<Comprobante> listarPorUsuario(Long idUsuario, Pageable pageable);
}
