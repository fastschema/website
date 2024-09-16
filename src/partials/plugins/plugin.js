const product = require('./schemas/product.json');
const { getRandomName, ping } = require('./utils');

const Config = config => {
  // Add product schema
  config.AddSchemas(product);

  // Change the fastschema port to 9000
  config.port = '9000';
}

const Init = plugin => {
  // Create a group named 'hello' with two public resources (routes):
  // - hello/ping
  // - hello/world
  plugin.resources
    .Group('hello')
    .Add(ping, { public: true })
    .Add(world, { public: true });
}

const world = async ctx => {
  const name = await getRandomName();
  return `Hello, ${name}!`;
}
