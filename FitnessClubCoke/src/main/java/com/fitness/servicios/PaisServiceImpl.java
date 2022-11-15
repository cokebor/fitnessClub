package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Pais;
import com.fitness.repositorios.IPaisRepository;

@Service
public class PaisServiceImpl implements IPaisService{
	
	@Autowired
	private IPaisRepository paisRepository;

	@Override
	@Transactional(readOnly = true)
	public List<Pais> listarTodos() {
		return paisRepository.findAll();
	}
}
