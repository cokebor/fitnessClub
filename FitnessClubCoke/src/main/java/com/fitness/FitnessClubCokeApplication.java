package com.fitness;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class FitnessClubCokeApplication implements CommandLineRunner{

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(FitnessClubCokeApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String password="030302";
		String passwordBcrypt=passwordEncoder.encode(password);
		System.out.println(passwordBcrypt);
	}

}
