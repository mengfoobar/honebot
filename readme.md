# Puzlr

A social bot that improves team chemistry/engagement through fun/competitive puzzles

## Repo Up
0. install nodejs LTS [https://nodejs.org/en/](https://nodejs.org/en/)
0. install dependencies `npm install`
0. make copy of `.sample.env` in root project folder to `.env`. Update configs based on your own local settings.
0. create mysql scheme `puzlr`. Command `CREATE SCHEMA `puzlr` DEFAULT CHARACTER SET utf8 ;
` 
0. run the app `node .`. You should be able to see in locally: `localhost:3000`
0. use **ngrok** to expose localhost to public so slack can access it. 
Follow instructions [https://api.slack.com/tutorials/tunneling-with-ngrok](https://api.slack.com/tutorials/tunneling-with-ngrok). 
Ignore step 4(creating simple http server. our bot does this) on the intructions
0. go on the generated ngrok url you added to slack, and login -> an entry will be added to MySql `workspace` table

### Good to have
#### Eslint
Helps maintain code quality. You can configure javascript linter on intellij [https://www.jetbrains.com/help/idea/eslint.html](https://www.jetbrains.com/help/idea/eslint.html).
Then just hit a shortcut to prettify code, cleanup...etc automatically.

## Debugging with Node
To debug and use breakpoints, just create a nodejs run config [https://www.jetbrains.com/help/idea/running-and-debugging-node-js.html#running](https://www.jetbrains.com/help/idea/running-and-debugging-node-js.html#running).
Then click on debug icon.

## Code Organization

### Our Code
All of our own code are in `app` folder. Everything else is from by `botkit` boilerplate (will replace bit by bit).

### Mysql Integration
The botkit user registration has been updated to work with mysql.
It's under `user_registration.js`. Or just do a global keyword search for `WORKSPACE_REGISTER_ENTRY` to where where the 
workspace is being saved when it's first created. 

## Supporting Library Docs

### Working with botkit
[https://botkit.ai/docs/](https://botkit.ai/docs/)

### Using Sequelize to MYSQL interfacting
[http://docs.sequelizejs.com/manual/installation/getting-started](http://docs.sequelizejs.com/manual/installation/getting-started)
