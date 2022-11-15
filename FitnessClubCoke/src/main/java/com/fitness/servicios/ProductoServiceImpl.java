package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Producto;
import com.fitness.repositorios.IProductoRepository;

@Service
public class ProductoServiceImpl implements IProductoService{

	@Autowired
	private IProductoRepository productoRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Producto> listarTodos() {
		return productoRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Producto> listarTodos(Pageable pageable) {
		return productoRepository.findAll(pageable);
	}

	
	@Override
	@Transactional(readOnly = true)
	public List<Producto> listarProductosConStockYActivos() {
		return productoRepository.listarProductosConStockYActivos();
	}
	
	@Override
	@Transactional(readOnly = true)
	public Page<Producto> listarProductosConStockYActivos(Pageable pageable) {
		return productoRepository.listarProductosConStockYActivos(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Producto buscarPorId(Long id) {
		return productoRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Producto guardar(Producto producto) {
		return productoRepository.save(producto);
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		productoRepository.deleteById(id);
	}
	
}
