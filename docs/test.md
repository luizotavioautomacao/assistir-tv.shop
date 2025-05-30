Desafio: Sistema de Autenticação Fullstack
O objetivo deste desafio é desenvolver uma aplicação Fullstack composta por:
Backend: API de autenticação de usuários.
Frontend: Interface web para interação com os endpoints da API.
O projeto deve ser desenvolvido com Node.js e TypeScript, utilizando boas práticas de separação de camadas, testes automatizados e execução via Docker e docker-compose.

Requisitos do Backend:
Desenvolvimento utilizando NestJS.
Separação clara entre controllers, services e repositories.
Implementação de testes unitários com Jest.
Contêiner independente para o banco de dados.
Funcionalidades obrigatórias:
Login de usuário
Endpoint que recebe email e senha.
Adiciona data e hora do momento da requisição.
Gera um JWE (JSON Web Encryption) com as informações.
Persiste no banco: email, senha, data/hora e JWE.
Retorna o JWE gerado.
Decriptação de JWE
Endpoint que recebe um JWE e retorna os dados decriptados.
Histórico de logins
Endpoint que retorna o histórico completo das requisições de login.
Documentação
Documentar as APIs utilizando Swagger ou ferramenta equivalente.
Observações:
A escolha das chaves (pública e privada) para o JWE fica a critério do(a) candidato(a), desde que haja encriptação assimétrica.
Se for utilizado código gerado por IA, é necessário indicar claramente nos commits ou comentários.

Requisitos do Frontend:
Desenvolvimento com React (ou Next.js) utilizando TypeScript.
Separação de componentes e organização do código.
Interface com estilização simples, porém funcional e responsiva.
Contêiner próprio via Docker.
Funcionalidades obrigatórias:
Tela de Login
Formulário para enviar email e senha ao endpoint de login.
Exibição do JWE retornado.
Tela de Decriptação
Campo para colar o JWE e enviar ao endpoint de decriptação.
Exibição do conteúdo decriptado.
Tela de Histórico
Listagem das entradas de login retornadas pelo endpoint de histórico.

Considerações Técnicas:
Consumo da API via fetch ou axios.
Testes unitários utilizando Jest e/ou Testing Library.
Uso opcional de ferramentas de estilização como CSS Modules ou Styled Components.
Implementação de Dockerfile para execução do frontend.

