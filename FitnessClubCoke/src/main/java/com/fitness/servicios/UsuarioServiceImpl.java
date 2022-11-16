package com.fitness.servicios;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Rol;
import com.fitness.modelo.Usuario;
import com.fitness.repositorios.IUsuarioRepository;

@Service
public class UsuarioServiceImpl implements UserDetailsService,IUsuarioService{

	private Logger logger=LoggerFactory.getLogger(UsuarioServiceImpl.class);
	
	@Autowired
	private IUsuarioRepository usuarioRepository;
	
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
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
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
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

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.buscarPorEmail(email);

        if (usuario == null) {
            logger.error("Error en el login; no existe el usuario con el email' " + email + "' en el sistema!");
            throw new UsernameNotFoundException(
                    "Error en el login; no existe el usuario con el email '" + email + "' en el sistema!");
        }
        List<Rol> roles = new ArrayList<>();
        roles.add(usuario.getRol());
        List<GrantedAuthority> autorizaciones = roles
                .stream()
                .map(rol -> new SimpleGrantedAuthority(rol.getNombre()))
                .collect(Collectors.toList());
      
      
        return new User(usuario.getEmail(), usuario.getPassword(), usuario.getEstado(), true, true, true,
                autorizaciones);

	}
}
