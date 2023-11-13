const fs = require('fs');

const TALKER_FILE = './talker.json';

const readTalkerFile = async () => {
  try {
    const file = await fs.promises.readFile(TALKER_FILE, 'utf-8');
    return JSON.parse(file);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  readTalkerFile,
};
