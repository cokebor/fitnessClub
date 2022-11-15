package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Localidad;
import com.fitness.repositorios.ILocalidadRepository;

@Service
public class LocalidadServiceImpl implements ILocalidadService{

	@Autowired
	private ILocalidadRepository localidadRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Localidad> listarLocalidadesPorProvincia(Long idProvincia) {
		return localidadRepository.listarLocalidadesPorProvincia(idProvincia);
	}
	
}
