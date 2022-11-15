package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Disciplina;
import com.fitness.repositorios.IDisciplinaRepository;

@Service
public class DisciplinaServiceImpl implements IDisciplinaService{

	@Autowired
	private IDisciplinaRepository disciplinaRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Disciplina> listarTodas() {
		return disciplinaRepository.findAll();	
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Disciplina> listarTodas(Pageable pageable) {
		return disciplinaRepository.findAll(pageable);	
	}
	
	@Override
	@Transactional(readOnly = true)
	public Disciplina buscarPorId(Long id) {
		return disciplinaRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Disciplina guardar(Disciplina disciplina) {
		return disciplinaRepository.save(disciplina);
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		disciplinaRepository.deleteById(id);
	}


}
