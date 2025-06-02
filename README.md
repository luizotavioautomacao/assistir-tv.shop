# Sistema de Autenticação Fullstack [assistir-tv.shop](https://assistir-tv.shop)  
Este é um sistema de autenticação fullstack desenvolvido com NestJS (backend) e Next.js (frontend).  
[Documento com teste](https://docs.google.com/document/d/1OpiMYAuz2sy0eG1xJVQRU_6y43z5KNv-/edit?usp=sharing&ouid=110746159081631494888&rtpof=true&sd=true)    

## Requisitos

- Docker
- Docker Compose
- make

## [Estrutura](./docs/tree.md) do Projeto

## Funcionalidades

### Backend
- Login de usuário com geração de JWE
- Decriptação de JWE
- Histórico de logins
- Documentação Swagger

### Frontend
- Tela de Home  
- Tela de Login
- Tela de Decriptação
- Tela de Histórico

## Executando o Projeto

1. Clone o repositório:
```bash
git clone git@github.com:luizotavioautomacao/assistir-tv.shop.git
cd assistir-tv.shop
```

2. Execute o projeto com Docker Compose:
```bash
docker-compose up --build
```

2. **Ou** execute o projeto com Makefile: 
```bash
make up
```

3. Acesse as aplicações:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger Documentation: http://localhost:3001/api

## Desenvolvimento

### Backend
```bash
cd backend
npm install
npm run dev
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

### **Backend**
  - Node.js
  - NestJS
  - Typescript
  - TypeORM
  - PostgreSQL
  - [JWE](./docs/jwe.md) (JSON Web Encryption)
  - Swagger

### **Frontend**
  - React
  - Next.js
  - TypeScript
  - Axios
  - Styled Components
  - Sass

### **Testes**
  - Jest

### **DevOps**
  - Docker
  - Docker Compose
  - Makefile

## [Documentações](./docs/)

### Pomodoro
[O projeto foi executado usando metodologia de Pomodoro](./docs/pomodoro.xls).  
Isso quer dizer que a cada 1 hora é executado em média 2 Pomodoros focados.  
O domínio do projeto é: [assistir-tv.shop](https://assistir-tv.shop)   
No mundo da tecnologia, durante toda a minha jornada, posso afirmar que existem obstáculos temporários.  
Quando uma determinada tarefa, começa a passar de alguns Pomodoros e essa tarefa não foi quebrada, e ainda continua na mesma tarefa, é um obstáculo temporário.   
- Em breve, coloco esse projeto em produção, quando remover o obstáculo temporário (resolvido ✅)

## [Scripts](./scripts/)
Antes de executar os arquivos .sh deve ser concedio permissões executando:
`chmod +x nome_do_arquivo.sh`  
- Testar api do backend com [curl](./scripts/curl.api.sh)  
- Acessar [banco de dados](./scripts/access.bd.sh)
- [Exportar](./scripts/export.logins.bd.sh) tabela de logins

## Observações
- As chaves de criptografia JWE são geradas automaticamente no ambiente de desenvolvimento ✅
- O banco de dados PostgreSQL é persistido através de um volume Docker ✅
- Em produção, as chaves deveriam ser configuradas via variáveis de ambiente (não realizado) ⚠️