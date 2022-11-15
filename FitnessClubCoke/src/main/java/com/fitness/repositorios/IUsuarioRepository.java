package com.fitness.repositorios;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fitness.modelo.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {

	@Query("select u from Usuario u where u.Email=?1")
	public Usuario buscarPorEmail(String email);
}
