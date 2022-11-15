package com.fitness.modelo;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="localidades")
public class Localidad implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdLocalidad")
	private Long IdLocalidad;
	
	@Column(name = "Nombre",nullable = false, length = 45)
	private String Nombre;
	
	@ManyToOne(optional=false,cascade=CascadeType.ALL)
	@JoinColumn(name = "IdProvincia", nullable = false)
	private Provincia Provincia;
	
	public Long getIdLocalidad() {
		return IdLocalidad;
	}
	public void setIdLocalidad(Long idLocalidad) {
		IdLocalidad = idLocalidad;
	}
	public String getNombre() {
		return Nombre;
	}
	public void setNombre(String nombre) {
		Nombre = nombre;
	}
	
	public Provincia getProvincia() {
		return Provincia;
	}
	public void setProvincia(Provincia provincia) {
		Provincia = provincia;
	}
	
	private static final long serialVersionUID = 1L;
}
