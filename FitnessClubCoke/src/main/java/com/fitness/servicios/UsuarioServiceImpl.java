package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Rol;
import com.fitness.modelo.Usuario;
import com.fitness.repositorios.IUsuarioRepository;

@Service
public class UsuarioServiceImpl implements IUsuarioService{

	@Autowired
	private IUsuarioRepository usuarioRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Usuario> listarTodos() {
		return usuarioRepository.findAll();
	}
	
	@Override
	@Transactional(readOnly = true)
	public Page<Usuario> listarTodos(Pageable pageable) {
		return usuarioRepository.findAll(pageable);
	}


	@Override
	@Transactional(readOnly = true)
	public Usuario buscarPorId(Long id) {
		return usuarioRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Usuario guardar(Usuario usuario) {
        Rol r = new Rol();
        r.setIdRol(1L);
        usuario.setRol(r);
		return usuarioRepository.save(usuario);
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		usuarioRepository.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario buscarPorEmail(String email) {
		return usuarioRepository.buscarPorEmail(email);
	}
}
