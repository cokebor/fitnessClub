package com.fitness.modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="rubros")
public class Rubro implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdRubro")
	private Long IdRubro;
	
	@Column(name = "Nombre",nullable = false, length = 45)
	private String Nombre;
	
	public Long getIdRubro() {
		return IdRubro;
	}
	public void setIdRubro(Long idRubro) {
		IdRubro = idRubro;
	}
	public String getNombre() {
		return Nombre;
	}
	public void setNombre(String nombre) {
		Nombre = nombre;
	}
	
	private static final long serialVersionUID = 1L;
}
