package com.fitness.modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="productos")
public class Producto implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdProducto")
	private Long IdProducto;
	
	@NotEmpty
	@Column(name = "Descripcion",nullable = false, length = 45)
	private String Descripcion;
	
	@ManyToOne(optional=false,fetch = FetchType.EAGER)
	@JoinColumn(name = "IdRubro",nullable = false)
	private Rubro Rubro;
	
	@ManyToOne(optional=false,fetch = FetchType.EAGER)
	@JoinColumn(name = "IdDisciplina", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Disciplina Disciplina;
	

	@ManyToOne(optional=false,fetch = FetchType.EAGER)
	@JoinColumn(name = "IdMarca", nullable = false)
	private Marca Marca;
	
	@Column(name = "PrecioUnitario",nullable = false)
	private float PrecioUnitario;
	
	@Column(name = "Imagen"/*,nullable = false*/)
	private String Imagen;
	
	@Column(name = "Stock",nullable = false)
	private int Stock;
	
	@Column(name = "Servicio",nullable = false)
	private boolean Servicio;
	
	@Column(name = "Estado",nullable = false)
	private boolean Estado;
	
	public Long getIdProducto() {
		return IdProducto;
	}
	public void setIdProducto(Long idProducto) {
		IdProducto = idProducto;
	}
	public String getDescripcion() {
		return Descripcion;
	}
	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
	}
	public Rubro getRubro() {
		return Rubro;
	}
	public void setRubro(Rubro rubro) {
		Rubro = rubro;
	}
	public Disciplina getDisciplina() {
		return Disciplina;
	}
	public void setDisciplina(Disciplina disciplina) {
		Disciplina = disciplina;
	}
	public Marca getMarca() {
		return Marca;
	}
	public void setMarca(Marca marca) {
		Marca = marca;
	}
	public float getPrecioUnitario() {
		return PrecioUnitario;
	}
	public void setPrecioUnitario(float precioUnitario) {
		PrecioUnitario = precioUnitario;
	}
	public String getImagen() {
		return Imagen;
	}
	public void setImagen(String imagen) {
		this.Imagen = imagen;
	}
	public int getStock() {
		return Stock;
	}
	public void setStock(int stock) {
		Stock = stock;
	}
	public boolean getServicio() {
		return Servicio;
	}
	public void setServicio(boolean servicio) {
		Servicio = servicio;
	}
	public boolean getEstado() {
		return Estado;
	}
	public void setEstado(boolean estado) {
		Estado = estado;
	}
	
	private static final long serialVersionUID = 1L;
}
