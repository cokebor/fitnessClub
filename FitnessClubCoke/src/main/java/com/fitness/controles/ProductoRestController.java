package com.fitness.controles;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fitness.modelo.Producto;
import com.fitness.servicios.IProductoService;
import com.fitness.servicios.IUploadFileService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:4200" })
public class ProductoRestController {
	@Autowired
	private IProductoService productoService;
	
	@Autowired
	private IUploadFileService uploadService;

	private final Logger log = LoggerFactory.getLogger(ProductoRestController.class);

	@Secured("ROLE_ADMIN")
	@GetMapping("/productos")
	public List<Producto> listarTodas() {
		return productoService.listarTodos();
	}

	@Secured("ROLE_ADMIN")
	@GetMapping("/productos/page/{page}")
	public Page<Producto> listarTodos(@PathVariable Integer page) {
		Pageable pageable = PageRequest.of(page, 6);
		return productoService.listarTodos(pageable);
	}

	@GetMapping("/productosActivos")
	public List<Producto> listarProductosConStockYActivos() {
		return productoService.listarProductosConStockYActivos();
	}

	@GetMapping("/productosActivos/page/{page}")
	public Page<Producto> listarProductosConStockYActivos(@PathVariable Integer page) {
		Pageable pageable = PageRequest.of(page, 4);
		return productoService.listarProductosConStockYActivos(pageable);
	}

	@GetMapping("/productos/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
		Producto pro = null;
		Map<String, Object> response = new HashMap<>();

		try {
			pro = productoService.buscarPorId(id);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (pro == null) {
			response.put("mensaje", "El Producto Id: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Producto>(pro, HttpStatus.OK);
	}

	@Secured("ROLE_ADMIN")
	@PostMapping("/productos")
	public ResponseEntity<?> guardar(@RequestBody Producto producto) {

		Producto productoNuevo = null;

		Map<String, Object> response = new HashMap<>();

		try {
			productoNuevo = productoService.guardar(producto);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El Producto ha sido creado con exito!");
		response.put("producto", productoNuevo);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/productos/{id}")
	public ResponseEntity<?> actualizar(@RequestBody Producto producto, @PathVariable Long id) {
		Producto productoActual = productoService.buscarPorId(id);
		Producto productoUpdated = null;

		Map<String, Object> response = new HashMap<>();

		if (productoActual == null) {
			response.put("mensaje", "Error: no se pudo editar, el Producto Id: "
					.concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {
			productoActual.setDescripcion(producto.getDescripcion());
			productoActual.setRubro(producto.getRubro());
			productoActual.setDisciplina(producto.getDisciplina());
			productoActual.setMarca(producto.getMarca());
			productoActual.setPrecioUnitario(producto.getPrecioUnitario());
			productoActual.setImagen(producto.getImagen());
			productoActual.setStock(producto.getStock());
			productoActual.setServicio(producto.getServicio());
			productoActual.setEstado(producto.getEstado());

			productoUpdated = productoService.guardar(productoActual);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el Producto en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El Producto ha sido actualizado con exito!");
		response.put("producto", productoUpdated);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/productos/{id}")
	public ResponseEntity<?> eliminar(@PathVariable Long id) {

		Map<String, Object> response = new HashMap<>();
		try {
			Producto producto = productoService.buscarPorId(id);
			String nombreFotoAnterior = producto.getImagen();
			
			uploadService.eliminar(nombreFotoAnterior);

			productoService.eliminar(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar el Producto en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Producto eliminado con exito!");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/productos/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {
		Map<String, Object> response = new HashMap<>();
		Producto producto = productoService.buscarPorId(id);

		if (!archivo.isEmpty()) {
			String nombreArchivo=null;
			
			try {
				nombreArchivo=uploadService.copiar(archivo); 
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen del Producto");
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			String nombreFotoAnterior = producto.getImagen();
			uploadService.eliminar(nombreFotoAnterior); 

			producto.setImagen(nombreArchivo);
			
			productoService.guardar(producto);
			
			response.put("producto", producto);
			response.put("mensaje", "Has subido correctamente la imagen: " + nombreArchivo);
		}

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@GetMapping("/productos/uploads/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {

		Resource recurso = null;

		try {
			recurso=uploadService.cargar(nombreFoto,"no-producto.jpeg");
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}

}
