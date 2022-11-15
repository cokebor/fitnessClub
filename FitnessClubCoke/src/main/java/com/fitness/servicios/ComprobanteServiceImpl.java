package com.fitness.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitness.modelo.Comprobante;
import com.fitness.repositorios.IComprobanteRepository;

@Service
public class ComprobanteServiceImpl implements IComprobanteService{

	@Autowired
	private IComprobanteRepository comprobanteRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Comprobante> listarTodos() {
		return comprobanteRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Comprobante> listarTodos(Pageable pageable) {
		return comprobanteRepository.findAll(pageable);
	}

	
	@Override
	@Transactional(readOnly = true)
	public Comprobante buscarPorId(Long id) {
		return comprobanteRepository.findById(id).orElse(null);
	}
	
	@Override
	@Transactional
	public Comprobante guardar(Comprobante comprobante) {
		return comprobanteRepository.save(comprobante);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Comprobante> listarPorUsuario(Long idUsuario) {
		return comprobanteRepository.listarPorUsuario(idUsuario);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Comprobante> listarPorUsuario(Long idUsuario, Pageable pageable) {
		return comprobanteRepository.listarPorUsuario(idUsuario,pageable);
	}

}
