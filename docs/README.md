### DTO (Data Transfer Object) é um padrão usado para transportar dados entre processos ou camadas de uma aplicação. No NestJS, usamos DTOs para:
- Especificar a forma dos dados esperados em um endpoint.  
- Aplicar validações automáticas (usando class-validator).  
- Gerar documentação automática (usando @nestjs/swagger).  

O objetivo de um módulo (@Module) no NestJS é organizar e agrupar:
    Imports (outros módulos),
    Controllers (interfaces HTTP),
    Providers (serviços, repositórios, etc).

    # 📺 vivotv.shop

Projeto Fullstack em Next.js com autenticação via JWE (JSON Web Encryption) e histórico de logins.

🔗 [Repositório no GitHub](https://github.com/luizotavioautomacao/vivotv.shop)

---

## 🧭 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Stack Utilizada](#stack-utilizada)
- [Passo a Passo dos PRs](#passo-a-passo-dos-prs)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Prints da Aplicação](#prints-da-aplicação)
- [Autor](#autor)

---

## 📌 Sobre o Projeto

O projeto **vivotv.shop** é uma aplicação de login e criptografia de dados, com visual limpo e acessível. O usuário realiza login, recebe um token JWE e pode decodificá-lo, além de acessar um histórico completo de logins.

---

## ⚙️ Funcionalidades

- [x] Login com email e senha
- [x] Geração de JWE no backend
- [x] Decriptação do JWE
- [x] Histórico de logins
- [x] Navbar responsiva
- [x] Footer customizado
- [x] Testes com `@testing-library/react`
- [x] CI com GitHub PRs

---

## 🛠️ Stack Utilizada

- **Frontend:** Next.js, TypeScript, Styled Components + SCSS
- **Backend (em outro repositório, se existir):** NestJS + MongoDB
- **Testes:** Jest + Testing Library
- **Estilização:** SCSS Modules e variáveis de tema
- **DevOps:** Docker, Docker Compose

---

## 📂 Passo a Passo dos PRs

| PR | Descrição | Link |
|----|-----------|------|
| #1 | Inicialização do projeto com estrutura base | [Ver PR](https://github.com/luizotavioautomacao/vivotv.shop/pull/1) |
| #2 | Implementação do Login com JWE | [Ver PR](https://github.com/luizotavioautomacao/vivotv.shop/pull/2) |
| #3 | Tela de Decrypt com validação | [Ver PR](https://github.com/luizotavioautomacao/vivotv.shop/pull/3) |
| #4 | Histórico de logins e navegação via Navbar | [Ver PR](https://github.com/luizotavioautomacao/vivotv.shop/pull/4) |
| #5 | Estilização com SCSS e melhorias no Footer | [Ver PR](https://github.com/luizotavioautomacao/vivotv.shop/pull/5) |
| #6 | Testes com React Testing Library | [Ver PR](https://github.com/luizotavioautomacao/vivotv.shop/pull/6) |

---

## ▶️ Como Rodar o Projeto

```bash
# Clone o repositório
git clone https://github.com/luizotavioautomacao/vivotv.shop

# Entre na pasta frontend
cd frontend

# Instale as dependências
npm install

# Rode o projeto
npm run dev



---

## 📌 O que mais pode ser interessante adicionar

- ✅ **GIF demonstrativo da aplicação funcionando**
- ✅ **Badges do GitHub** (ex: build passing, coverage, etc.)
- ✅ **Link para o backend** se for separado
- ✅ **Instruções de deploy com Docker** (se aplicável)
- ✅ **Sessão “Aprendizados” ou “Motivações do projeto”**
- ✅ **Licença** (MIT por padrão)

Se quiser, posso gerar um `README.md` real com base nos seus arquivos atuais, só pedir!
