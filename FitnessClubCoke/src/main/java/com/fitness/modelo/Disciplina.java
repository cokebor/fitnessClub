package com.fitness.modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="disciplinas")
public class Disciplina implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdDisciplina")
	private Long IdDisciplina;
	
	@Column(name = "Nombre",nullable = false, length = 45)
	private String Nombre;
	
	public Long getIdDisciplina() {
		return IdDisciplina;
	}
	public void setIdDisciplina(Long idDisciplina) {
		IdDisciplina = idDisciplina;
	}
	public String getNombre() {
		return Nombre;
	}
	public void setNombre(String nombre) {
		Nombre = nombre;
	}
	
	private static final long serialVersionUID = 1L;
}
