package com.fitness.controles;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.modelo.Disciplina;
import com.fitness.servicios.IDisciplinaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
public class DisciplinaRestController {
	@Autowired
	private IDisciplinaService disciplinaService;
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/disciplinas")
	public List<Disciplina> listarTodas(){
		return disciplinaService.listarTodas();
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/disciplinas/page/{page}")
	public Page<Disciplina> listarTodas(@PathVariable Integer page){
		Pageable pageable=PageRequest.of(page, 6);
		return disciplinaService.listarTodas(pageable);
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/disciplinas/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
		
		Disciplina dis=null;
		Map<String,Object> response=new HashMap<>();
		
		try {
			dis=disciplinaService.buscarPorId(id);

		}catch(DataAccessException e) {
			response.put("mensaje","Error al realizar la consulta en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(dis==null){
			response.put("mensaje","La Disciplina Id: " .concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Disciplina>(dis,HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/disciplinas")
	public ResponseEntity<?> guardar(@Valid @RequestBody Disciplina disciplina, BindingResult result) {
		
		Disciplina disNuevo=null;
		
		Map<String,Object> response=new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors=result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors",errors);
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
		}
		
		
		try {
			disNuevo=disciplinaService.guardar(disciplina);
		} catch (DataAccessException e) {
			response.put("mensaje","Error al realizar el insert en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje","La Disciplina ha sido creada con exito!");
		response.put("disciplina", disNuevo);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
		
	}
	@Secured("ROLE_ADMIN")
	@PutMapping("/disciplinas/{id}")
	public ResponseEntity<?> actualizar(@Valid @RequestBody Disciplina disciplina, BindingResult result, @PathVariable Long id) {
		Disciplina disciplinaActual=disciplinaService.buscarPorId(id);
		Disciplina disciplinaUpdated=null;
		
		Map<String,Object> response=new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors=result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors",errors);
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
		}
		
		if(disciplinaActual==null){
			response.put("mensaje","Error: no se pudo editar, la Disciplina Id: " .concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			disciplinaActual.setNombre(disciplina.getNombre());
			disciplinaUpdated=disciplinaService.guardar(disciplinaActual);		
		}catch (DataAccessException e) {
			response.put("mensaje","Error al actualizar la Disciplina en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje","La Disciplina ha sido actualizada con exito!");
		response.put("disciplina", disciplinaUpdated);
		
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/disciplinas/{id}")
	public ResponseEntity<?> eliminar(@PathVariable Long id) {
		Map<String,Object> response=new HashMap<>();
		try {
			disciplinaService.eliminar(id);
		}catch (DataAccessException e) {
			response.put("mensaje","Error al eliminar la Disciplina en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Disciplina eliminada con exito!");
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
	}
}
