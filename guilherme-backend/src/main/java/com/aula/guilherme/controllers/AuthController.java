package com.aula.guilherme.controllers;

import com.aula.guilherme.entities.Usuario;
import com.aula.guilherme.service.JwtService;
import com.aula.guilherme.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String senha = loginData.get("senha");
            
            if (email == null || email.trim().isEmpty() || senha == null || senha.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Email e senha são obrigatórios");
                return ResponseEntity.badRequest().body(error);
            }
            
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email.trim(), senha)
            );
            
            Usuario usuario = (Usuario) authentication.getPrincipal();
            String token = jwtService.generateToken(usuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("usuario", Map.of(
                "id", usuario.getId(),
                "nome", usuario.getNome(),
                "email", usuario.getEmail()
            ));
            
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email ou senha incorretos");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erro interno do servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastro(@RequestBody Usuario usuario) {
        try {
            // Validações básicas
            if (usuario.getNome() == null || usuario.getNome().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Nome é obrigatório");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (usuario.getEmail() == null || usuario.getEmail().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Email é obrigatório");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (usuario.getSenha() == null || usuario.getSenha().length() < 6) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Senha deve ter pelo menos 6 caracteres");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Limpar dados
            usuario.setNome(usuario.getNome().trim());
            usuario.setEmail(usuario.getEmail().trim().toLowerCase());
            
            Usuario novoUsuario = usuarioService.salvar(usuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Usuário cadastrado com sucesso");
            response.put("usuario", Map.of(
                "id", novoUsuario.getId(),
                "nome", novoUsuario.getNome(),
                "email", novoUsuario.getEmail()
            ));
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erro interno do servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}