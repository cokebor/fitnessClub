package com.fitness.servicios;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fitness.modelo.Usuario;

public interface IUsuarioService {
	
	public List<Usuario> listarTodos();
	
	public Page<Usuario> listarTodos(Pageable pageable);
	
	public Usuario buscarPorId(Long id);
	
	public Usuario guardar(Usuario usuario);
	
	public void eliminar(Long id);
	
	public Usuario buscarPorEmail(String email);
}
