module.exports = (controller) => {
  controller.on('dialog_submission', (bot, e) => {
    // TODO: save settings in workspace/channel

    DialogCallbackHandler[e.callback_id](bot, e);
  });
};

const DialogCallbackHandler = {
  settings: (bot, e) => {
    console.log(e.submission);
    bot.reply(e, 'Got it!');
    // call dialogOk or else Slack will think this is an error
    bot.dialogOk();
  },
};
