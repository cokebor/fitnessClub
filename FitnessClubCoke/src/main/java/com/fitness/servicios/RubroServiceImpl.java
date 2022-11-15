package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Rubro;
import com.fitness.repositorios.IRubroRepository;

@Service
public class RubroServiceImpl implements IRubroService{

	@Autowired
	private IRubroRepository rubroRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Rubro> listarTodos() {
		return rubroRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Rubro> listarTodos(Pageable pageable) {
		return rubroRepository.findAll(pageable);
	}
	
	@Override
	@Transactional(readOnly = true)
	public Rubro buscarPorId(Long id) {
		return rubroRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Rubro guardar(Rubro rubro) {
		return rubroRepository.save(rubro);
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		rubroRepository.deleteById(id);
	}

}
