package com.fitness.controles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.modelo.Provincia;
import com.fitness.servicios.IProvinciaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ProvinciaRestController {

	@Autowired
	private IProvinciaService provinciaService;
	
	@GetMapping("/provincias/{idPais}")
	private List<Provincia> listarProvinciasPorPais(@PathVariable Long idPais) {
		return provinciaService.listarProvinciasPorPais(idPais);
	}
}
