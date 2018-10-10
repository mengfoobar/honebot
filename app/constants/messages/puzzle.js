module.exports = {
  START_PUZZLE: () => [{
    attachments: [
      {
        title: 'Hey there good looking. Click Start to take on the puzzle!',
        callback_id: 'start_puzzle',
        actions: [
          {
            name: 'start_puzzle',
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
  SUBMISSION_RESULT_CORRECT_ANSWER: () => 'You completed the puzzle in %s. Final score: %f.2',
  SUBMISSION_RESULT_WRONG_ANSWER: () => 'Hope ya got some in ya for next time.',
  ALREADY_SUBMITTED: () => 'You already submitted an answer for this quiz. Let\'s play fair now',
  OUT_OF_PUZZLES: () => "Your have finished up all our puzzles you go getter! We'll be back with more soon!",

};
