module.exports = {
  parseMentionText: (text = '') => {
    /*
      Format as below:
      <command> <value> <configs ex. -param1 value -param2 value2>
     */
    let parsed = {};
    const args = text.split(' ');
    if (args && args.length > 0) {
      parsed = {
        command: args[0],
        value: args[1],
        configs: args.length > 2 ? {} : null,
      };

      for (let i = 2; i < args.length; i += 2) {
        parsed.configs[args[i]] = args[i + 1];
      }
    }
    return parsed;
  },
};
