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
@Table(name="provincias")
public class Provincia implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdProvincia")
	private Long IdProvincia;
	
	@Column(name = "Nombre",nullable = false, length = 45)
	private String Nombre;
		
	@ManyToOne(optional=false,cascade=CascadeType.ALL)
	@JoinColumn(name = "IdPais", nullable = false)
	private Pais Pais;
	
	/*
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "IdProvincia")
	private List<Localidad> Localidades;
	*/
	public Long getIdProvincia() {
		return IdProvincia;
	}
	public void setIdProvincia(Long idProvincia) {
		IdProvincia = idProvincia;
	}
	public String getNombre() {
		return Nombre;
	}
	public void setNombre(String nombre) {
		Nombre = nombre;
	}
	
	/*
	public List<Localidad> getLocalidades() {
		return Localidades;
	}
	public void setLocalidades(List<Localidad> localidades) {
		Localidades = localidades;
	}
*/
	
	public Pais getPais() {
		return Pais;
	}
	public void setPais(Pais pais) {
		Pais = pais;
	}
	
	private static final long serialVersionUID = 1L;
}
