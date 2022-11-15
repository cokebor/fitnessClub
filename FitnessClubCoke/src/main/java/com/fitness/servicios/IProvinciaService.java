package com.fitness.servicios;

import java.util.List;

import com.fitness.modelo.Provincia;

public interface IProvinciaService {
	public List<Provincia> listarProvinciasPorPais(Long idPais);
}
