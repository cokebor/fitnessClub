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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.modelo.Comprobante;
import com.fitness.servicios.IComprobanteService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ComprobanteRestController {

	@Autowired
	private IComprobanteService comprobanteService;
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/comprobantes")
	public List<Comprobante> listarTodos(){
		return comprobanteService.listarTodos();
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/comprobantes/page/{page}")
	public Page<Comprobante> listarTodos(@PathVariable Integer page){
		Pageable pageable=PageRequest.of(page, 6);
		return comprobanteService.listarTodos(pageable);
	}
	
	@GetMapping("/comprobantes/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
		Comprobante comp=null;
		Map<String,Object> response=new HashMap<>();
		
		try {
			comp=comprobanteService.buscarPorId(id);

		}catch(DataAccessException e) {
			response.put("mensaje","Error al realizar el insert en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(comp==null){
			response.put("mensaje","El Comprobante Id: " .concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Comprobante>(comp,HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@PostMapping("/comprobantes")
	public ResponseEntity<?> guardar(@RequestBody Comprobante comprobante) {
		Comprobante compNuevo=null;
		
		Map<String,Object> response=new HashMap<>();
		
		try {
			compNuevo=comprobanteService.guardar(comprobante);
		} catch (DataAccessException e) {
			response.put("mensaje","Error al realizar el insert en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje","El Comprobante ha sido creado con exito!");
		response.put("comprobante", compNuevo);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	
	@Secured("ROLE_USER")
	@GetMapping("/comprobantes/usuario/{idUsuario}")
	public ResponseEntity<?> listarPorUsuario(@PathVariable Long idUsuario) {
		List<Comprobante> comp=null;
		Map<String,Object> response=new HashMap<>();
		
		try {
			comp=comprobanteService.listarPorUsuario(idUsuario);

		}catch(DataAccessException e) {
			response.put("mensaje","Error al realizar la consulta en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(comp==null){
			response.put("mensaje","El Usuario no contiene comprobantes!");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Comprobante>>(comp,HttpStatus.OK);
	}
	
	@Secured("ROLE_USER")
	@GetMapping("/comprobantes/usuario/page/{page}/{idUsuario}")
	public ResponseEntity<?> listarPorUsuario(@PathVariable Long idUsuario,@PathVariable Integer page){
		Page<Comprobante> comp=null;
		Map<String,Object> response=new HashMap<>();

		Pageable pageable=PageRequest.of(page, 6);
		
		try {
			comp=comprobanteService.listarPorUsuario(idUsuario,pageable);

		}catch(DataAccessException e) {
			response.put("mensaje","Error al realizar la consulta en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(comp==null){
			response.put("mensaje","El Usuario no contiene comprobantes!");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Page<Comprobante>>(comp,HttpStatus.OK);

	}
}
