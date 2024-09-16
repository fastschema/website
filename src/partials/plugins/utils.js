const getRandomName = async () => {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
  return names[Math.floor(Math.random() * names.length)];
}

const ping = ctx => {
  return 'pong';
}

module.exports = {
  getRandomName,
  ping,
}
