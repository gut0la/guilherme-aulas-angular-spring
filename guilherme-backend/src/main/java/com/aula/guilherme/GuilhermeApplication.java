package com.aula.guilherme;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GuilhermeApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(GuilhermeApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Aplicação iniciada com sucesso!");
	}
}
