package com.fitness.controles;

import java.io.IOException;
import java.net.MalformedURLException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fitness.modelo.Usuario;
import com.fitness.servicios.IUploadFileService;
import com.fitness.servicios.IUsuarioService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
public class UsuarioRestController {
	@Autowired
	private IUsuarioService usuarioService;
	
	@Autowired
	private IUploadFileService uploadService;
	
	private final Logger log = LoggerFactory.getLogger(ProductoRestController.class);
	
	@GetMapping("/usuarios")
	public List<Usuario> listarTodas(){
		return usuarioService.listarTodos();
	}
	
	@GetMapping("/usuarios/page/{page}")
	public Page<Usuario> listarTodos(@PathVariable Integer page){
		Pageable pageable=PageRequest.of(page, 10);
		return usuarioService.listarTodos(pageable);
	}

	
	@GetMapping("/usuarios/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
		Usuario us=null;
		Map<String,Object> response=new HashMap<>();
		
		try {
			us=usuarioService.buscarPorId(id);

		}catch(DataAccessException e) {
			response.put("mensaje","Error al realizar la consulta en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(us==null){
			response.put("mensaje","El Usuario Id: " .concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Usuario>(us,HttpStatus.OK);
	}
	
	@PostMapping("/usuarios")
	public ResponseEntity<?> guardar(@RequestBody Usuario usuario) {
		
		Usuario usuarioNuevo = null;

		Map<String, Object> response = new HashMap<>();

		try {
			usuarioNuevo = usuarioService.guardar(usuario);
		} catch (DataAccessException e) {
			response.put("mensaje","Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El Usuario ha sido creado con exito!");
		response.put("usuario", usuarioNuevo);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);


	}
	
	@PutMapping("/usuarios/{id}")
	public ResponseEntity<?> actualizar(@RequestBody Usuario usuario, @PathVariable Long id) {
		Usuario usuarioActual=usuarioService.buscarPorId(id);
		Usuario usuarioUpdated=null;
		
		Map<String,Object> response=new HashMap<>();
		
		if(usuarioActual==null){
			response.put("mensaje","Error: no se pudo editar, el Usuario Id: " .concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			usuarioActual.setNombre(usuario.getNombre());
			usuarioActual.setApellido(usuario.getApellido());
			usuarioActual.setEmail(usuario.getEmail());
			usuarioActual.setDNI(usuario.getDNI());
			usuarioActual.setDireccion(usuario.getDireccion());
			usuarioActual.setLocalidad(usuario.getLocalidad());
			usuarioActual.setPassword(usuario.getPassword());
			usuarioActual.setRol(usuario.getRol());
			usuarioActual.setImagen(usuario.getImagen());
			usuarioActual.setEstado(usuario.getEstado());
			usuarioUpdated=usuarioService.guardar(usuarioActual);		
		}catch (DataAccessException e) {
			response.put("mensaje","Error al actualizar el Usuario en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje","El Usuario ha sido actualizado con exito!");
		response.put("usuario", usuarioUpdated);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
		
	}
	
	@DeleteMapping("/usuarios/{id}")
	public ResponseEntity<?> eliminar(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Usuario usuario = usuarioService.buscarPorId(id);
			String nombreFotoAnterior = usuario.getImagen();
			
			uploadService.eliminar(nombreFotoAnterior);
			
			usuarioService.eliminar(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar el Usuario en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Usuario eliminado con exito!");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	
	@PostMapping("/usuarios/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {
		Map<String, Object> response = new HashMap<>();
		Usuario usuario = usuarioService.buscarPorId(id);

		if (!archivo.isEmpty()) {
			String nombreArchivo=null;
			try {
				nombreArchivo=uploadService.copiar(archivo); 
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen del Usuario");
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			String nombreFotoAnterior = usuario.getImagen();
			uploadService.eliminar(nombreFotoAnterior); 

			usuario.setImagen(nombreArchivo);
			
			usuarioService.guardar(usuario);
			
			response.put("usuario", usuario);
			response.put("mensaje", "Has subido correctamente la imagen: " + nombreArchivo);
		}

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/usuarios/uploads/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {

		Resource recurso = null;

		try {
			recurso=uploadService.cargar(nombreFoto,"no-usuario.png");
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}

		
		
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}
}
