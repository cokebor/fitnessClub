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

import com.fitness.modelo.Marca;
import com.fitness.servicios.IMarcaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:4200" })
public class MarcaRestController {
	@Autowired
	private IMarcaService marcaService;

	@Secured("ROLE_ADMIN")
	@GetMapping("/marcas")
	public List<Marca> listarTodas() {
		return marcaService.listarTodas();
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/marcas/page/{page}")
	public Page<Marca> listarTodas(@PathVariable Integer page){
		Pageable pageable=PageRequest.of(page, 6);
		return marcaService.listarTodas(pageable);
	}

	@Secured("ROLE_ADMIN")
	@GetMapping("/marcas/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable Long id) {

		Marca mar = null;
		Map<String, Object> response = new HashMap<>();

		try {
			mar = marcaService.buscarPorId(id);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (mar == null) {
			response.put("mensaje", "La Marca Id: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Marca>(mar, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/marcas")
	public ResponseEntity<?> guardar(@RequestBody Marca marca) {

		Marca marcaNuevo = null;

		Map<String, Object> response = new HashMap<>();

		try {
			marcaNuevo = marcaService.guardar(marca);
		} catch (DataAccessException e) {
			response.put("mensaje","Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La Marca ha sido creada con exito!");
		response.put("marca", marcaNuevo);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

	}

	@Secured("ROLE_ADMIN")
	@PutMapping("/marcas/{id}")
	public ResponseEntity<?> actualizar(@RequestBody Marca marca, @PathVariable Long id) {
		Marca marcaActual = marcaService.buscarPorId(id);
		Marca marcaUpdated=null;
		
		Map<String,Object> response=new HashMap<>();
		
		if(marcaActual==null){
			response.put("mensaje","Error: no se pudo editar, la Marca Id: " .concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			marcaActual.setNombre(marca.getNombre());
			marcaUpdated=marcaService.guardar(marcaActual);		
		}catch (DataAccessException e) {
			response.put("mensaje","Error al actualizar la Marca en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje","La Marca ha sido actualizada con exito!");
		response.put("marca", marcaUpdated);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}

	@Secured("ROLE_ADMIN")
	@DeleteMapping("/marcas/{id}")
	public ResponseEntity<?> eliminar(@PathVariable Long id) {
		Map<String,Object> response=new HashMap<>();
		try {
			marcaService.eliminar(id);
		}catch (DataAccessException e) {
			response.put("mensaje","Error al eliminar la Marca en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Marca eliminada con exito!");
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
	}
}
