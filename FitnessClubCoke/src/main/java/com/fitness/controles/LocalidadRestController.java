package com.fitness.controles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.modelo.Localidad;
import com.fitness.servicios.ILocalidadService; 	

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
public class LocalidadRestController {
	@Autowired
	private ILocalidadService localidadService;
	
	@GetMapping("/localidades/{idProvincia}")
	private List<Localidad> listarLocalidadesPorProvincia(@PathVariable Long idProvincia) {
		return localidadService.listarLocalidadesPorProvincia(idProvincia);
	}
}
