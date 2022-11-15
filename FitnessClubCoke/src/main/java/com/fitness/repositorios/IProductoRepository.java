package com.fitness.repositorios;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fitness.modelo.Producto;

public interface IProductoRepository extends JpaRepository<Producto,Long>{

	//la query es sobre las clases no sobre la bd
	@Query("from Producto p where p.Stock>0 and p.Estado=1")
	public List<Producto> listarProductosConStockYActivos();
	
	@Query("from Producto p where p.Stock>0 and p.Estado=1")
	public Page<Producto> listarProductosConStockYActivos(Pageable pageable);
}
