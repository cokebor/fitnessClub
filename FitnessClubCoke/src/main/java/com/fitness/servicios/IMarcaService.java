package com.fitness.servicios;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fitness.modelo.Marca;

public interface IMarcaService {
	
	public List<Marca> listarTodas();
	
	public Page<Marca> listarTodas(Pageable pageable);
	
	public Marca buscarPorId(Long id);
	
	public Marca guardar(Marca marca);
	
	public void eliminar(Long id);
}
