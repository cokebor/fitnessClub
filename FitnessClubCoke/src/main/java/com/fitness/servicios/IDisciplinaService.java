package com.fitness.servicios;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fitness.modelo.Disciplina;

public interface IDisciplinaService {
	
	public List<Disciplina> listarTodas();
	
	public Page<Disciplina> listarTodas(Pageable pageable);
	
	public Disciplina buscarPorId(Long id);
	
	public Disciplina guardar(Disciplina disciplina);
	
	public void eliminar(Long id);
	
}
