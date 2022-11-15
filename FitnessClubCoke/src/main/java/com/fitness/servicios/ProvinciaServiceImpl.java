package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Provincia;
import com.fitness.repositorios.IProvinciaRepository;

@Service
public class ProvinciaServiceImpl implements IProvinciaService{

	@Autowired
	private IProvinciaRepository provinciaRepository;

	@Override
	@Transactional(readOnly = true)
	public List<Provincia> listarProvinciasPorPais(Long idPais) {
		return provinciaRepository.listarProvinciasPorPais(idPais);
	}
	
	

}
