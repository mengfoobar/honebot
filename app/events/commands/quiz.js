const Timer = require('easytimer.js');
const _ = require('lodash');
const { sprintf } = require('sprintf-js');

const message = require('../../constants/messages/quiz');
const MessageTypes = require('../../constants/messageTypes');
const { getUniqueQuiz } = require('../../store/quiz');
const Submission = require('../../store/submission');

module.exports = {
  start: (bot, event, configs = null) => {
    bot.startPrivateConversation(event, async (err, convo) => {
      convo.addQuestion(...message.START_QUIZ());
      const uniqueQuiz = await getUniqueQuiz();
      uniqueQuiz.messages.map((m) => {
        switch (m.type) {
          case MessageTypes.IMAGE:
            convo.addMessage(m.value);
            break;
          case MessageTypes.TEXT:
            convo.addMessage(m.value);
            break;
          case MessageTypes.QUESTION:
            if (m.choices) {
              const timer = new Timer();
              timer.start();
              console.log(timer.getTimeValues());
              convo.addQuestion({
                attachments: [{
                  title: m.value,
                  callback_id: uniqueQuiz.id,
                  actions:
                    m.choices.map(btn => ({
                      name: btn.value,
                      text: btn.label,
                      value: btn.value,
                      type: 'button',
                    })),

                }],
              }, m.choices.map(m => ({
                pattern: m.value,
                callback: async (reply, convo) => {
                  const timeDuration = timer.getTimeValues().toString();
                  timer.stop();
                  const submittedValue = _.get(reply, 'actions.0.value');
                  const score = _.random(0, 10.0);
                  await Submission.save({
                    duration: timeDuration,
                    user: reply.user,
                    channel: reply.channel,
                    reply: submittedValue,
                    correctAnswer: uniqueQuiz.answer,
                    quizId: uniqueQuiz.id,
                    score,
                  });

                  if (submittedValue == uniqueQuiz.answer) {
                    convo.addMessage(message.CORRECT_ANSWER());
                    convo.addMessage(
                      sprintf(message.QUIZ_SUBMISSION_RESULT_CORRECT_ANSWER(),
                        timeDuration, score),
                    );
                  } else {
                    convo.addMessage(message.WRONG_ANSWER());
                    convo.addMessage(
                      sprintf(message.QUIZ_SUBMISSION_RESULT_WRONG_ANSWER()),
                    );
                  }

                  convo.next();

                  // TODO show leaderboard
                  // TODO: compare with average
                },
              })));
            } else {
              convo.addQuestion(m.value);
            }
            break;
          default:
            break;
        }
      });
    });
  },
};
