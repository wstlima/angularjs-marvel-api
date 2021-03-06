# Angular JS 1.5 

Aplicação com testes avançados para Angular JS 1.X usando ES6 modules consumindo a API da Marvel

Ótima estrutura para projetos corporativos com foco pesado em testes unitários e integração.

## Demo
* https://marvel.controlemix.com.br


## Começando

1. Clone o repositório `git clone https://github.com/wstlima/angularjs-marvel-api`
2. Entre no diretório do projeto `cd angularjs-marvel-api`
3. Instale as dependências: 

Com NPM
`npm i` ou `npm install` 

Com Yarn
`yarn`

## Scripts

Usando npm para rodar os scripts `npm run [script]`
Exemplo: `npm run test`.

Usando yarn para rodar os scripts `yarn [script]`
Exemplo: `yarn test`.

* `start` - inicie o servidor de desenvolvimento, experimente-o abrindo `http://localhost:8081`

* `build` - criar compilação dev, verifique o diretório `build`
* `dist` - criar build de produção, verifique o diretório `dist`

* `server_build` - serve conteúdo do diretório `build`
* `server_dist` - serve conteúdo do diretório `dist`

* `lint` - código lint (com ESLint)
* `mocha` - execute todos os testes unitários (com Mocha)
* `watch` - execute e assista a todos os testes unitários (com Mocha)
* `karma` - execute todos os testes de integração (com Karma/Jasmine)
* `test` - código lint e execute todos os testes (com Mocha e Karma)

* `ci` - para Travis CI

## Executando Testes

* `*.test.js` - mocha testes unitários
* `*.integration.test.js` - mocha testes de integração (manual)
* `*.spec.js` - karma testes de integração 

## Mudanças

* 1.2.0 Implementção da da paginação básica para os quadrinhos
* 1.1.0 Implementção da Lightbox para abrir um quadrinho
* 1.0.0 Release inicial