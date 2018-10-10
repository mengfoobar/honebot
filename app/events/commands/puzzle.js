/* eslint-disable eqeqeq */
const Timer = require('easytimer.js');
const _ = require('lodash');
const { sprintf } = require('sprintf-js');

const message = require('../../constants/messages/puzzle');
const MessageTypes = require('../../constants/messageTypes');
const { getFreshPuzzle } = require('../../store/puzzle');
const Submission = require('../../store/submission');

module.exports = {
  start: (bot, event, configs = null) => {
    bot.startPrivateConversation(event, async (err, convo) => {
      convo.addQuestion(...message.START_PUZZLE());
      const freshPuzzle = await getFreshPuzzle(_.get(convo, 'context.channel', null));
      if (!freshPuzzle) {
        convo.addMessage(message.OUT_OF_PUZZLES());
        convo.next();
        return;
      }

      freshPuzzle.messages.map((m) => {
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
              convo.addQuestion({
                attachments: [{
                  title: m.value,
                  callback_id: freshPuzzle.id,
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

                  const submittedAnswer = _.get(reply, 'actions.0.value');
                  const score = _.random(0, 10.0);
                  const isAnswerCorrect = (submittedAnswer == freshPuzzle.correctAnswer);

                  const [submission, created] = await Submission.save({
                    duration: timeDuration,
                    user: reply.user,
                    channel: reply.channel,
                    submittedAnswer,
                    isAnswerCorrect,
                    puzzle: freshPuzzle.id,
                    score,
                  });

                  if (!created) {
                    convo.addMessage(message.ALREADY_SUBMITTED());
                    convo.next();
                    return;
                  }

                  if (isAnswerCorrect) {
                    convo.addMessage(message.CORRECT_ANSWER());
                    convo.addMessage(
                      sprintf(message.SUBMISSION_RESULT_CORRECT_ANSWER(),
                        timeDuration, score),
                    );
                  } else {
                    convo.addMessage(message.WRONG_ANSWER());
                    convo.addMessage(
                      sprintf(message.SUBMISSION_RESULT_WRONG_ANSWER()),
                    );
                  }

                  convo.next();

                  // TODO show leaderboard
                  // TODO: compare with average scores
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
