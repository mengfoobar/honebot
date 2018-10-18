const Timer = require('easytimer.js');
const _ = require('lodash');
const { sprintf } = require('sprintf-js');

const Messages = require('../../../constants/messagesTemplates/puzzle');
const Submission = require('../../../store/submission');

/* eslint-disable no-use-before-define */
module.exports = {
  TEXT: ({ message, convo }) => {
    convo.addMessage(message.value);
    convo.next();
  },
  IMAGE: ({ message, convo }) => {
    convo.addMessage(message.value);
    convo.next();
  },
  MC_QUESTION: ({
    message, puzzle, convo, bot, originChannel,
  }) => {
    const timer = new Timer();
    const { user } = convo.context;
    convo.addQuestion(
      {
        attachments: [
          {
            title: message.value,
            callback_id: puzzle.id,
            actions: message.choices.map(btn => ({
              name: btn.value,
              text: btn.label,
              value: btn.value,
              type: 'button',
            })),
          },
        ],
      },
      message.choices.map(m => ({
        pattern: m.value,
        callback: async (reply, convo) => {
          const timeDuration = timer.getTimeValues().toString();
          timer.stop();
          timer.removeEventListener('secondsUpdated', () => {});
          convo.stop();

          const submittedAnswer = _.get(reply, 'actions.0.value');
          const score = _.random(0, 10.0);
          // eslint-disable-next-line eqeqeq
          const isAnswerCorrect = submittedAnswer == puzzle.correctAnswer;

          const [submission, created] = await Submission.save({
            duration: timeDuration,
            user,
            submittedAnswer,
            isAnswerCorrect,
            puzzle: puzzle.id,
            score,
            channel: originChannel,
          });

          if (!created) {
            bot.say({ text: Messages.ALREADY_SUBMITTED(), channel: user });
            return;
          }

          if (isAnswerCorrect) {
            bot.say({
              text: `${Messages.CORRECT_ANSWER()}.\n ${sprintf(
                Messages.SUBMISSION_RESULT_CORRECT_ANSWER(),
                timeDuration,
                score,
              )}`,
              channel: user,
            });
          } else {
            bot.say({
              text: `${Messages.WRONG_ANSWER()}\n ${Messages.SUBMISSION_RESULT_WRONG_ANSWER()}`,
              channel: user,
            });
          }
        },
      })),
    );
    convo.next();
    timer.start();
    handleTimerSecondsUpdated(timer, bot, convo, puzzle);
  },
};

const handleTimerSecondsUpdated = (timer, bot, convo, puzzle) => {
  const { user, channel } = convo.context;
  timer.addEventListener('secondsUpdated', async () => {
    const { minutes, seconds } = timer.getTimeValues();

    if (minutes === 4 && seconds === 0) {
      bot.say({ text: Messages.ONE_MINUTE_LEFT(), channel: user });
    }

    if (minutes === 4 && seconds === 30) {
      bot.say({ text: Messages.THIRTY_SECONDS_LEFT(), channel: user });
    }

    if (minutes === 5 && seconds === 0) {
      timer.stop();
      timer.removeEventListener('secondsUpdated', () => {});
      convo.stop();
      bot.say({
        text: Messages.TIMES_UP(),
        channel: user,
      });

      const [submission, created] = await Submission.save({
        duration: timer.getTimeValues().toString(),
        user,
        channel,
        submittedAnswer: null,
        isAnswerCorrect: false,
        puzzle: puzzle.id,
        score: 0,
      });
    }
  });
};
