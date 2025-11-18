# Sistema de Avaliação de Obras - Angular + Spring Boot

## 🚀 Melhorias Implementadas

### Backend (Spring Boot)
- ✅ **AuthController melhorado** com validações robustas e tratamento de erros específicos
- ✅ **UsuarioService aprimorado** com validação de email duplicado e formato
- ✅ **Respostas estruturadas** com mensagens de erro claras
- ✅ **Validações de entrada** para todos os campos obrigatórios
- ✅ **Tratamento de exceções** específicas (BadCredentialsException, IllegalArgumentException)

### Frontend (Angular)
- ✅ **Componente de Cadastro** com validações em tempo real
- ✅ **Confirmação de senha** no cadastro
- ✅ **Loading states** em todos os formulários
- ✅ **Validações visuais** com mensagens de erro específicas
- ✅ **Design moderno** com gradientes e sombras
- ✅ **Snackbars coloridos** para feedback visual
- ✅ **Guards melhorados** (auth e guest)
- ✅ **Rotas protegidas** adequadamente

### Validações Implementadas

#### Cadastro:
- Nome obrigatório
- Email obrigatório e formato válido
- Email único no sistema
- Senha mínima de 6 caracteres
- Confirmação de senha
- Sanitização de dados (trim, toLowerCase)

#### Login:
- Email e senha obrigatórios
- Mensagens de erro específicas
- Loading state durante autenticação

## 🛠️ Como Executar

### Pré-requisitos
- Java 17+
- Node.js 18+
- PostgreSQL
- Maven

### Backend
```bash
cd guilherme-backend
mvn spring-boot:run
```

### Frontend
```bash
cd guilherme-frontend
npm install
ng serve
```

### Banco de Dados
1. Criar banco PostgreSQL chamado `guilherme_db`
2. Configurar credenciais em `application.properties`
3. O Hibernate criará as tabelas automaticamente

## 🎯 Endpoints da API

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/cadastro` - Cadastro de novo usuário

### Obras
- `GET /obras` - Listar todas as obras
- `GET /obras/{id}` - Buscar obra por ID
- `POST /obras` - Criar nova obra
- `PUT /obras/{id}` - Atualizar obra
- `DELETE /obras/{id}` - Deletar obra

### Avaliações
- `GET /avaliacoes` - Listar avaliações
- `POST /avaliacoes` - Criar avaliação
- `GET /avaliacoes/usuario/{id}` - Avaliações do usuário

## 🔐 Segurança
- JWT para autenticação
- Senhas criptografadas com BCrypt
- CORS configurado para localhost:4200
- Guards de rota no frontend
- Interceptor para adicionar token automaticamente

## 🎨 Interface
- Material Design com Angular Material
- Design responsivo
- Feedback visual com snackbars
- Loading states
- Validações em tempo real
- Gradientes modernos

## 📱 Funcionalidades
- Sistema completo de autenticação
- Cadastro e login de usuários
- Proteção de rotas
- Validações robustas
- Interface moderna e intuitiva
- Tratamento de erros adequado