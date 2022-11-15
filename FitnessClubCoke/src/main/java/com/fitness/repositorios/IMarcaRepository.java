package com.fitness.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitness.modelo.Marca;

public interface IMarcaRepository extends JpaRepository<Marca, Long>{

}
