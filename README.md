![alt-text-1](https://i.ibb.co/2YTzVrd/print1.png)
> Imagem da tela inicial da plataforma Saude 092

![alt-text-2](https://i.ibb.co/TRtCwjq/print2.png)
> Imagem da tela de notícias da plataforma Saude 092

# Saude 092

A Plataforma Saúde 092 surgiu na competição Pandemic Amazon Hack Saúde 2020 a partir da produção de solução para instrumentos de acesso a informação e postos de atendimento em saúde pública.

## Funcionamento da Plataforma

### Cliente (front-end)

A parte de front-end foi desenvolvida com o framework Bootstrap 4 e está sendo hospedada na plataforma Github Pages. A parte de [atendimento](#Atendimento) é um formulário onde um paciente com suspeita de Covid-19 responde perguntas do tipo "Você está com falta de ar?" e o próprio sistema passa instruções ao paciente, sendo três casos possíveis:

- Caso 1 (Sem COVID-19) -> O paciente recebe instruções de tomar precauções de higiene e permanecer em sua casa.

- Caso 2 (Suspeita de COVID-19) -> Uma bate-papo (chat) é aberto no próprio navegador para o paciente conversar com um atendente que passará novas instruções

- Caso 3 (Sintomas graves de COVID-19) -> O sistema manda um email à central e mostra à pessoa qual é a unidade médica mais próxima dela de acordo com a resposta de seu geolocalizador (GPS) e o banco de unidades da plataforma, disponível em: https://github.com/NKKFu/team-13-repository/blob/master/back-end/ubs-list.js

Preview funcional: https://nkkfu.github.io/team-13-repository/front-end/

### Atendimento (back-end)

A parte de atendimento ao cliente é um bate-papo desenvolvido com **Socket.IO** com o propósito do paciente receber instruções corretas por uma pessoa. 

Preview funcional: https://nkkfu.github.io/team-13-repository/back-end/pages/admin.html

Clique em "Entrar em uma sala", após isso um número de quarto será dado à você. Depois disso, espere alguém ser direcionado à você (através da parte de atendimento do front-end), o sistema faz isso automaticamente.

### Cadastro (back-end)

Todo paciente cadastrado pela Saude 092 será catalogado no email da unidade à ser encaminhado, porém como o projeto ainda não está em sua forma de produção a visualização de todos e-mails está disponível abertamente à qualquer um em: https://maildrop.cc/inbox/ubs-2914


## Executando front-end

> A parte front-end do sistema está toda desenvolvida em HTML5 nativo portanto não há necessidade de passos adicionais, basta abrir o arquivo /front-end/index.html em qualquer navegador (browser), recomendamos o Google Chrome. 

## Executando back-end

> Todo o sistema backend da plataforma está sendo executado dentro da plataforma Heroku em sua versão gratuita

Com o NodeJS e as dependências do projeto instaladas, utilize o comando

`$ node /back-end/index.js`

na **pasta raiz** do projeto para rodar a API que criamos. Seu uso é simples:

- Rota *GET* `/find/:lati/:long` -> Procurar uma unidade médica próxima às coordenadas enviadas.<br>
Query params -> <br>
:lati -> Int - Latitude<br>
:long -> Int - Longitude

- Rota *POST* `/patient/new` -> Enviar um email à central com dados de um paciente.<br>
Corpo da mensagem (body) ->

```
    {
    	email: String,
    	name: String,
    	age: Int,
    	isGroup: String,
    	marks: String,
    	contact: String,
    }
```

## Criadores

| **Nelson Kenmochi** | **Glauco Soprano** | **Karla Pereira** |
| :------------: | :------------: | :------------: |
| ![](https://i.ibb.co/LhVkGjS/Whats-App-Image-2020-04-12-at-11-30-29.jpg)   | ![](https://i.ibb.co/2gMgm7j/Whats-App-Image-2020-04-12-at-11-58-11.jpg)  | ![](https://i.ibb.co/KNHDWhH/karla.png) |
| Desenvolvedor | Biotecnólogo | Negócios |

## Tecnologias envolvidas

- Back-end : [NodeJS](https://nodejs.org/), [Socket.IO](https://socket.io/), [Heroku](https://www.heroku.com/), [Github Pages](https://pages.github.com/), [nodemailer](https://nodemailer.com/), [Express](https://expressjs.com/pt-br/), API REST, [Saude092-chat](https://github.com/NKKFu/saude092-chat)
- Front-end : HTML5, CSS, JavaScript, [Bootstrap 4](https://getbootstrap.com/)
- Dependências : [CORS](https://www.npmjs.com/package/cors),  [dotenv](https://www.npmjs.com/package/dotenv),  [Express](https://expressjs.com/pt-br/),  [nodemailer](https://nodemailer.com/),  [Socket.IO](https://socket.io/)

## Repositórios adicionais (complementares)

Saude092-chat -> https://github.com/NKKFu/saude092-chat
> Utilizado para a comunicação entre o paciente e o atendente que irá passar as instruções corretas ao paciente. Está hospedada no Heroku. Não foi possível colocá-lo neste mesmo repositório pois seria possível o Heroku executar duas aplicações na mesma porta com propósitos diferentes, por isso o sistema Saude 092 está em duas aplicações Heroku.