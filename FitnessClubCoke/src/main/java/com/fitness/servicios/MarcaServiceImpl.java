package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Marca;
import com.fitness.repositorios.IMarcaRepository;

@Service
public class MarcaServiceImpl implements IMarcaService {

	@Autowired
	private IMarcaRepository marcaRepository; 
	
	@Override
	@Transactional(readOnly = true)
	public List<Marca> listarTodas() {
		return marcaRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Marca> listarTodas(Pageable pageable) {
		return marcaRepository.findAll(pageable);
	}
	
	@Override
	@Transactional(readOnly = true)
	public Marca buscarPorId(Long id) {
		return marcaRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Marca guardar(Marca marca) {
		return marcaRepository.save(marca);
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		marcaRepository.deleteById(id);
	}

}
