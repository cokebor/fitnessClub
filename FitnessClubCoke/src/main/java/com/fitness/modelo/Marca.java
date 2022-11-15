package com.fitness.modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;


@Entity
@Table(name="marcas")
public class Marca implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdMarca")
	private Long IdMarca;
	
	@NotEmpty
	@Column(name = "Nombre",nullable = false, length = 45)
	private String Nombre;
	
	/*
	@OneToMany(mappedBy = "Marca", fetch = FetchType.LAZY, orphanRemoval = false)
	@JsonManagedReference
	private List<Producto> Productos;
	*/
	public Long getIdMarca() {
		return IdMarca;
	}
	public void setIdMarca(Long idMarca) {
		IdMarca = idMarca;
	}
	public String getNombre() {
		return Nombre;
	}
	public void setNombre(String nombre) {
		Nombre = nombre;
	}
	
	private static final long serialVersionUID = 1L;
}
