const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = '../talker.json';

const readTalkerFile = async () => {
  try {
    const talkerFile = await fs.readFile(path.resolve(__dirname, TALKER_FILE), 'utf-8');
    return JSON.parse(talkerFile);
  } catch (error) {
    console.error('Erro ao ler o arquivo', error);
  }
};

module.exports = {
  readTalkerFile,
};
