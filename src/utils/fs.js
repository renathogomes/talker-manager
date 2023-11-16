const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = '../talker.json';

const readTalkerFile = async () => {
  try {
    const talkerFile = await fs.readFile(path.resolve(__dirname, TALKER_FILE), 'utf-8');
    return JSON.parse(talkerFile);
  } catch (error) {
    console.error('Erro ao ler o arquivo');
  }
};

const findTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  return talkers.find((talker) => talker.id === parseInt(id, 10));
};

const addTalker = async (talker) => {
  const talkers = await readTalkerFile();
  const newTalker = { ...talker, id: talkers.length + 1 };
  talkers.push(newTalker);
  await fs.writeFile(path.resolve(__dirname, TALKER_FILE), JSON.stringify(talkers));
  return newTalker;
};

module.exports = {
  readTalkerFile,
  findTalkerById,
  addTalker,
};
