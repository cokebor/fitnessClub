package com.fitness.servicios;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fitness.modelo.Rubro;

public interface IRubroService {
	
	public List<Rubro> listarTodos();
	
	public Page<Rubro> listarTodos(Pageable pageable);
	
	public Rubro buscarPorId(Long id);
	
	public Rubro guardar(Rubro rubro);
	
	public void eliminar(Long id);
}
