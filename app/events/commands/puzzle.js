/* eslint-disable eqeqeq,no-use-before-define */
const Timer = require('easytimer.js');
const _ = require('lodash');
const { sprintf } = require('sprintf-js');

const User = require('../../store/user');
const Messages = require('../../constants/messages/puzzle');
const MessageTypes = require('../../constants/messageTypes');
const { getFreshPuzzle } = require('../../store/puzzle');
const Submission = require('../../store/submission');

module.exports = {
  start: (bot, event, configs = null) => {
    bot.startPrivateConversation(event, async (err, convo) => {
      convo.addQuestion(...Messages.START_PUZZLE());
      const [user, isNew] = await User.save({
        workspace: _.get(convo, 'context.bot.config.id', ''),
        id: _.get(convo, 'context.user'),
        channel: _.get(convo, 'context.channel'),
      });

      // TODO: send some nice messages for new users

      const freshPuzzle = await getFreshPuzzle(_.get(convo, 'context.channel', null));
      if (!freshPuzzle) {
        convo.addMessage(Messages.OUT_OF_PUZZLES());
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
              handleMultipleChoiceQuestion(freshPuzzle, m, convo);
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

const handleMultipleChoiceQuestion = (puzzle, question, convo) => {
  const timer = new Timer();
  timer.start();
  convo.addQuestion({
    attachments: [{
      title: question.value,
      callback_id: puzzle.id,
      actions:
          question.choices.map(btn => ({
            name: btn.value,
            text: btn.label,
            value: btn.value,
            type: 'button',
          })),

    }],
  }, question.choices.map(m => ({
    pattern: m.value,
    callback: async (reply) => {
      const timeDuration = timer.getTimeValues().toString();
      timer.stop();

      const submittedAnswer = _.get(reply, 'actions.0.value');
      const score = _.random(0, 10.0);
      const isAnswerCorrect = (submittedAnswer == puzzle.correctAnswer);

      const [submission, created] = await Submission.save({
        duration: timeDuration,
        user: reply.user,
        channel: reply.channel,
        submittedAnswer,
        isAnswerCorrect,
        puzzle: question.id,
        score,
      });

      if (!created) {
        convo.addMessage(Messages.ALREADY_SUBMITTED());
        convo.next();
        return;
      }

      if (isAnswerCorrect) {
        convo.addMessage(Messages.CORRECT_ANSWER());
        convo.addMessage(
          sprintf(Messages.SUBMISSION_RESULT_CORRECT_ANSWER(),
            timeDuration, score),
        );
      } else {
        convo.addMessage(Messages.WRONG_ANSWER());
        convo.addMessage(
          sprintf(Messages.SUBMISSION_RESULT_WRONG_ANSWER()),
        );
      }

      convo.next();

      // TODO show leaderboard
      // TODO: compare with average scores
    },
  })));
};
