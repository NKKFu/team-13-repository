![alt-text-1](https://i.ibb.co/2YTzVrd/print1.png)
> Imagem da tela inicial da plataforma Saude 092

![alt-text-2](https://i.ibb.co/TRtCwjq/print2.png)
> Imagem da tela de notícias da plataforma Saude 092

# Saude 092

### Sobre

A Plataforma Saúde 092 surgiu na competição Pandemic Amazon Hack Saúde 2020 a partir da produção de solução para instrumentos de acesso a informação e postos de atendimento em saúde pública.

### Funcionamento da Plataforma

#### Cliente

A parte de front-end foi desenvolvida com o framework Bootstrap 4 e está sendo hospedada na plataforma Github Pages. A parte de [atendimento](#Atendimento) é um formulário onde um paciente com suspeita de Covid-19 responde perguntas do tipo "Você está com falta de ar?" e o próprio sistema passa instruções ao paciente, sendo três casos possíveis:

- Caso 1 (Sem COVID-19) -> O paciente recebe instruções de tomar precauções de higiene e permanecer em sua casa.

- Caso 2 (Suspeita de COVID-19) -> Uma bate-papo (chat) é aberto no próprio navegador para o paciente conversar com um atendente que passará novas instruções

- Caso 3 (Sintomas graves de COVID-19) -> O sistema manda um email à central e mostra à pessoa qual é a unidade médica mais próxima dela de acordo com a resposta de seu geolocalizador (GPS)

Preview funcional: https://nkkfu.github.io/team-13-repository/front-end/

#### Atendimento

A parte de atendimento ao cliente é um bate-papo desenvolvido com **Socket.IO** com o propósito do paciente receber instruções corretas por uma pessoa. 
Preview funcional: https://nkkfu.github.io/team-13-repository/back-end/pages/admin.html

#### Cadastro

Todo paciente cadastrado pela Saude 092 será catalogado no email da unidade à ser encaminhado, porém como o projeto ainda não está em sua forma de produção a visualização de todos e-mails está disponível abertamente à qualquer um em: https://maildrop.cc/inbox/ubs-2914

### Rodando back-end

> Todo o sistema backend da plataforma está sendo executado dentro da plataforma Heroku em sua versão gratuita

Com o NodeJS e as dependências do projeto instaladas, utilize o comando

`$ node /back-end/index.js`

na **pasta raiz** do projeto para rodar a API que criamos. Seu uso é simples:

- Rota *POST* `/find/:lati/:long` -> Procurar uma unidade médica próxima às coordenadas enviadas.<br>
Query params -> <br>
:lati -> Int - Latitude<br>
:long -> Int - Longitude

- Rota *POST* `/patient/new` -> Enviar um email à central com dados de um paciente.<br>
Corpo da mensagem (body) -> <br>
    {
    	email: String,
    	name: String,
    	age: Int,
    	isGroup: String,
    	marks: String,
    	contact: String,
    }

### Criadores

| **Nelson Kenmochi** | **Glauco Soprano** | **Karla Pereira** |
| :------------: | :------------: | :------------: |
| ![](https://i.ibb.co/LhVkGjS/Whats-App-Image-2020-04-12-at-11-30-29.jpg)   | ![](https://i.ibb.co/2gMgm7j/Whats-App-Image-2020-04-12-at-11-58-11.jpg)  | ![](https://i.ibb.co/KNHDWhH/karla.png) |
| Desenvolvedor | Biotecnólogo | Negócios |

### Tecnologias envolvidas

- Back-end : [NodeJS](https://i.ibb.co/LhVkGjS/Whats-App-Image-2020-04-12-at-11-30-29.jpg )NodeJS , Socket.IO, Heroku, Github Pages, Express, API REST, Saude092-Chat
- Front-end : HTML5, CSS, Js, Bootstrap

### Repositórios adicionais

Saude092-Chat -> https://github.com/NKKFu/saude092-chat
> Serve para a comunicação entre o paciente e o atendente que irá passar as instruções corretas ao paciente. Está hospedada no Heroku.