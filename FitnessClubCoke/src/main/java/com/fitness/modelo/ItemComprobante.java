package com.fitness.modelo;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="itemsComprobantes")
public class ItemComprobante implements Serializable{
	
	@Id
	@ManyToOne(optional=false,cascade=CascadeType.ALL)
    @JoinColumn(name="IdComprobante", nullable=false)
	@JsonBackReference
	private Comprobante Comprobante;
	
	@Id
	@Column(name = "Renglon",nullable = false)
	private int Renglon;
	
	@ManyToOne(optional=false,cascade=CascadeType.ALL)
	@JoinColumn(name = "IdProducto",nullable = false)
	@JsonBackReference
	private Producto Producto;
	
	@Column(name = "Cantidad",nullable = false)
	private int Cantidad;
	
	@Column(name = "PrecioUnitario",nullable = false)
	private float PrecioUnitario;
	
	public Comprobante getComprobante() {
		return Comprobante;
	}
	public void setComprobante(Comprobante comprobante) {
		Comprobante = comprobante;
	}
	public int getRenglon() {
		return Renglon;
	}
	public void setRenglon(int renglon) {
		Renglon = renglon;
	}
	public Producto getProducto() {
		return Producto;
	}
	public void setProducto(Producto producto) {
		Producto = producto;
	}
	public int getCantidad() {
		return Cantidad;
	}
	public void setCantidad(int cantidad) {
		Cantidad = cantidad;
	}
	public float getPrecioUnitario() {
		return PrecioUnitario;
	}
	public void setPrecioUnitario(float precioUnitario) {
		PrecioUnitario = precioUnitario;
	}
	
	private static final long serialVersionUID = 1L;
}
