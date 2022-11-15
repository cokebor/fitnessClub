package com.fitness.servicios;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fitness.modelo.Comprobante;


public interface IComprobanteService {
	
	public List<Comprobante> listarTodos();
	
	public Page<Comprobante> listarTodos(Pageable pageable);
	
	public Comprobante buscarPorId(Long id);
	
	public Comprobante guardar(Comprobante comprobante);
	
	public List<Comprobante> listarPorUsuario(Long idUsuario);
	
	public Page<Comprobante> listarPorUsuario(Long idUsuario,Pageable pageable);
}
