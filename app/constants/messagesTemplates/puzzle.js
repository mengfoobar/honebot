const { generateDynamicId } = require('../../utils/idGenerator');

module.exports = {
  START_PUZZLE: cb => [{
    attachments: [
      {
        title: 'Why hello there! Click Start to begin the puzzle.\n Remember you have up to 5 minutes to complete it!',
        callback_id: generateDynamicId('start_puzzle'),
        actions: [
          {
            name: generateDynamicId('start_puzzle'),
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
        cb && cb(convo);
      },
    },
  ]],
  CORRECT_ANSWER: () => 'Awesome! You got the right answer!',
  WRONG_ANSWER: () => 'Oh nos...answer is not right',
  SUBMISSION_RESULT_CORRECT_ANSWER: () => 'You completed the puzzle in %s. Final score: %f',
  SUBMISSION_RESULT_WRONG_ANSWER: () => 'Hope ya got some in ya for next time.',
  ALREADY_SUBMITTED: () => 'You already submitted an answer for this quiz. Let\'s play fair now',
  OUT_OF_PUZZLES: () => "Your have finished up all our puzzles you go getter! We'll be back with more soon!",
  ONE_MINUTE_LEFT: () => "Only 1 minute left! Let's crunch those numbers",
  THIRTY_SECONDS_LEFT: () => '30 seconds left!',
  TIMES_UP: () => 'Times Up. Nothing submitted :( Better luck next time!',
  SET_SETTINGS: cb => [{
    attachments: [
      {
        title: 'Time to edit your settings',
        callback_id: generateDynamicId('edit_settings'),
        actions: [
          {
            name: 'edit',
            text: 'Edit Settings',
            value: 'edit',
            type: 'button',
          },
        ],
      },
    ],
  }, [
    {
      pattern: 'edit',
      callback: cb,
    },
  ]],
};
