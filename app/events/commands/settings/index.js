const Messages = require('../../../constants/messages/puzzle');

module.exports = {
  default: (bot, event, configs = null) => {
    // TODO send interactive message. then open dialog
    bot.startConversation(event, async (err, convo) => {
      convo.addQuestion(
        ...Messages.SET_SETTINGS((event, convo) => {
          const dialog = bot
            .createDialog('Puzlr Settings', 'settings', 'Submit')
            .addSelect(
              'Select',
              'select',
              null,
              [{ label: 'Foo', value: 'foo' }, { label: 'Bar', value: 'bar' }],
              { placeholder: 'Select One' },
            )
            .addTextarea('Textarea', 'textarea', 'some longer text', {
              placeholder: 'Put words here',
            });

          bot.replyWithDialog(event, dialog.asObject(), (err, res) => {
            // handle your errors!
            console.log(res);
          });
        }),
      );
    });
  },
};
