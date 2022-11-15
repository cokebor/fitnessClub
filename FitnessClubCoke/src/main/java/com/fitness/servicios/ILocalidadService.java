package com.fitness.servicios;

import java.util.List;

import com.fitness.modelo.Localidad;

public interface ILocalidadService {
	
	public List<Localidad> listarLocalidadesPorProvincia(Long idProvincia);
}
