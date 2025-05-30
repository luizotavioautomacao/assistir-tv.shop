# Sistema de Autenticação Fullstack [vivotv.shop](https://vivotv.shop)  

## Pomodoro
O projeto foi executado usando metodologia de Pomodoro.  
Isso quer dizer que a cada 1 hora é executado em média 2 Pomodoros focados.
Os últimos Pomodoros tenho tentato colocar esse projeto em produção em uma EC2 no qual já tenho controle.
O domínio é: [vivotv.shop](https://vivotv.shop) e redireciono para o EC2 que tenho controle.
Porém ainda não consegui fazer o devido redirecionamento para ter mais de um projeto no mesmo EC2.
No mundo da tecnologia, durante toda a minha jornada, posso afirmar que existem obstáculos temporários.
Quando em uma determinada tarefa, começa a passar de alguns Pomodoros e essa tarefa não foi quebrada, e ainda continua na mesma tarefa, é um obstáculo temporário. 
Em breve coloco esse projeto em produção.  

Este é um sistema de autenticação fullstack desenvolvido com NestJS (backend) e Next.js (frontend).  
[Documento com teste](https://docs.google.com/document/d/1OpiMYAuz2sy0eG1xJVQRU_6y43z5KNv-/edit?usp=sharing&ouid=110746159081631494888&rtpof=true&sd=true)    

## Requisitos

- Docker
- Docker Compose

## Estrutura do Projeto

```
.
├── backend/          # API NestJS
├── frontend/         # Aplicação Next.js
└── docker-compose.yml
```

## Funcionalidades

### Backend
- Login de usuário com geração de JWE
- Decriptação de JWE
- Histórico de logins
- Documentação Swagger

### Frontend
- Tela de Login
- Tela de Decriptação
- Tela de Histórico

## Executando o Projeto

1. Clone o repositório:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Execute o projeto com Docker Compose:
```bash
docker-compose up --build
```

3. Acesse as aplicações:
- Frontend: http://localhost:3002
- Backend API: http://localhost:3001
- Swagger Documentation: http://localhost:3001/api

## Desenvolvimento

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Testes

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## Tecnologias Utilizadas

- Backend:
  - NestJS
  - TypeORM
  - PostgreSQL
  - JWE (JSON Web Encryption)
  - Swagger

- Frontend:
  - Next.js
  - TypeScript
  - Styled Components
  - Axios

## Observações
- As chaves de criptografia JWE são geradas automaticamente no ambiente de desenvolvimento
- Em produção, as chaves devem ser configuradas via variáveis de ambiente
- O banco de dados PostgreSQL é persistido através de um volume Docker