package com.fitness.controles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.modelo.Pais;
import com.fitness.servicios.IPaisService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
public class PaisRestController {
	@Autowired
	private IPaisService paisService;
	
	@GetMapping("/paises")
	public List<Pais> listarTodas(){
		return paisService.listarTodos();
	}
}
