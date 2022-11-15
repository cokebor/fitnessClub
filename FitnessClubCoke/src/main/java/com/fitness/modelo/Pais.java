package com.fitness.modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;





@Entity
@Table(name="paises")
public class Pais implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdPais")
	private Long IdPais;
	
	@Column(name = "Nombre",nullable = false, length = 45)
	private String Nombre;
	/*
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "IdPais")
	private List<Provincia> Provincias;
	*/
	public Long getIdPais() {
		return IdPais;
	}
	public void setIdPais(Long idPais) {
		IdPais = idPais;
	}
	public String getNombre() {
		return Nombre;
	}
	public void setNombre(String nombre) {
		Nombre = nombre;
	}
	/*
	public List<Provincia> getProvincias() {
		return Provincias;
	}
	public void setProvincias(List<Provincia> provincias) {
		Provincias = provincias;
	}
*/


	private static final long serialVersionUID = 1L;
}
