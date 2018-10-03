# Puzlr

A social bot that improves team chemistry/engagement through fun/competitive puzzles

## Setting Up
0. install nodejs LTS [https://nodejs.org/en/](https://nodejs.org/en/)
0. install botkit `npm install -g botkit`
0. install dependencies `npm install`
0. make copy of `.sample.env` in root project folder to `.env`
0. configure javascript linter on intellij [https://www.jetbrains.com/help/idea/eslint.html](https://www.jetbrains.com/help/idea/eslint.html)
0. create mysql scheme `puzlr`. Command `CREATE SCHEMA `puzlr` DEFAULT CHARACTER SET utf8 ;
` 
0. run the app `node .`. You should be able to see in locally: `localhost:3000`
0. use **ngrok** to expose localhost to public so slack can access it. 
Follow instructions [https://api.slack.com/tutorials/tunneling-with-ngrok](https://api.slack.com/tutorials/tunneling-with-ngrok). 
Ignore step 4(creating simple http server. our bot does this) on the intructions 


## Supporting Library Docs

### Working with botkit
[https://botkit.ai/docs/](https://botkit.ai/docs/)

### Using Sequelize to MYSQL interfacting
[http://docs.sequelizejs.com/manual/installation/getting-started](http://docs.sequelizejs.com/manual/installation/getting-started)
