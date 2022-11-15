package com.fitness.servicios;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fitness.modelo.Producto;

public interface IProductoService {
	public List<Producto> listarTodos();
	
	public Page<Producto> listarTodos(Pageable pageable);
	
	public List<Producto> listarProductosConStockYActivos();
	
	public Page<Producto> listarProductosConStockYActivos(Pageable pageable);
	
	public Producto buscarPorId(Long id);
	
	public Producto guardar(Producto producto);
	
	public void eliminar(Long id);
}
