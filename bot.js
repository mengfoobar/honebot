var env = require('node-env-file');
env(__dirname + '/.env');
const getStore = require('./app/store')
require('./app/schedules/channel')


if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  usage_tip();
}

var Botkit = require('botkit');

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    debug: true,
    scopes: [
      'bot',
      'chat:write:bot',
      'commands'
    ]
};

bot_options.storage = getStore()

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot(bot_options);

controller.startTicking();

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);


webserver.get('/', function(req, res){
  res.render('index', {
    domain: req.get('host'),
    protocol: req.protocol,
    glitch_domain:  process.env.PROJECT_DOMAIN,
    layout: 'layouts/default'
  });
})

webserver.get('/hello', (req, res) => res.send('Hello World!'))
// Set up a simple storage backend for keeping a record of customers
// who sign up for the app via the oauth
require(__dirname + '/components/user_registration.js')(controller);

// Send a message when joining a channel
const {initChannelEvents, initWorkspaceEvents, initCommandEvents, initDialogEvents} = require('./app/events');
initChannelEvents(controller);
initWorkspaceEvents(controller);
initCommandEvents(controller);
initDialogEvents(controller)


var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});

function usage_tip() {
    console.log('~~~~~~~~~~');
    console.log('clientId=<MY SLACK CLIENT ID> clientSecret=<MY CLIENT SECRET> PORT=3000 studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js');
    console.log('~~~~~~~~~~');
}
