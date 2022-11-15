package com.fitness.modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="roles")
public class Rol implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdRol")
	private Long IdRol;
	
	@Column(name = "Nombre",nullable = false, length = 30,unique=true)
	private String Nombre;
	/*
	@Column(name = "Descripcion",nullable = false, length = 30,unique=true)
	private String Descripcion;
	*/
	
	public Long getIdRol() {
		return IdRol;
	}
	public void setIdRol(Long idRol) {
		IdRol = idRol;
	}
	public String getNombre() {
		return Nombre;
	}
	public void setNombre(String nombre) {
		Nombre = nombre;
	}
	
	/*
	public String getDescripcion() {
		return Descripcion;
	}
	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
	}
*/

	private static final long serialVersionUID = 1L;
}
