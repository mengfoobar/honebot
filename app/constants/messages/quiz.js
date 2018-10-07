module.exports = {
  START_QUIZ: () => [{
    attachments: [
      {
        title: 'Hey there good looking. Click Start to take on the puzzle!',
        callback_id: 'start_quiz',
        actions: [
          {
            name: 'start_quiz',
            text: 'Start',
            value: 'yes',
            type: 'button',
          },
        ],
      },
    ],
  }, [
    {
      pattern: 'yes',
      callback(reply, convo) {
        convo.next();
      },
    },
  ]],
  CORRECT_ANSWER: () => 'Awesome! You got the right answer!',
  WRONG_ANSWER: () => 'Oh nos...answer is not right',
  QUIZ_SUBMISSION_RESULT_CORRECT_ANSWER: () => 'You completed the puzzle in %s. Final score: %f.2',
  QUIZ_SUBMISSION_RESULT_WRONG_ANSWER: () => 'Hope ya got some in ya for next time.',

};
