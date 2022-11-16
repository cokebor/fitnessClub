package com.fitness.controles;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.modelo.Rubro;
import com.fitness.servicios.IRubroService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
public class RubroRestController {
	@Autowired
	private IRubroService rubroService;
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/rubros")
	public List<Rubro> listarTodas(){
		return rubroService.listarTodos();
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/rubros/page/{page}")
	public Page<Rubro> listarTodos(@PathVariable Integer page){
		Pageable pageable=PageRequest.of(page, 6);
		return rubroService.listarTodos(pageable);
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/rubros/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable Long id) {

		Rubro ru=null;
		Map<String,Object> response=new HashMap<>();
		
		try {
			ru=rubroService.buscarPorId(id);

		}catch(DataAccessException e) {
			response.put("mensaje","Error al realizar la consulta en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(ru==null){
			response.put("mensaje","El Rubro Id: " .concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Rubro>(ru,HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/rubros")	
	public ResponseEntity<?> guardar(@RequestBody Rubro rubro) {
		
		Rubro rubroNuevo = null;

		Map<String, Object> response = new HashMap<>();

		try {
			rubroNuevo = rubroService.guardar(rubro);
		} catch (DataAccessException e) {
			response.put("mensaje","Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El Rubro ha sido creado con exito!");
		response.put("rubro", rubroNuevo);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/rubros/{id}")
	public ResponseEntity<?> actualizar(@RequestBody Rubro rubro, @PathVariable Long id) {
		
		Rubro rubroActual=rubroService.buscarPorId(id);
		Rubro rubroUpdated=null;
		
		Map<String,Object> response=new HashMap<>();
		
		if(rubroActual==null){
			response.put("mensaje","Error: no se pudo editar, el Rubro Id: " .concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			rubroActual.setNombre(rubro.getNombre());
			rubroUpdated=rubroService.guardar(rubroActual);		
		}catch (DataAccessException e) {
			response.put("mensaje","Error al actualizar el Rubro en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje","El Rubro ha sido actualizado con exito!");
		response.put("rubro", rubroUpdated);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	
		
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/rubros/{id}")	
	public ResponseEntity<?> eliminar(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		try {
			rubroService.eliminar(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar el Rubro en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Rubro eliminado con exito!");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}
