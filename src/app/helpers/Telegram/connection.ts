import { Telegram } from 'telegram-js';
import * as MTProto from '@goodmind/telegram-mt-node';
import * as TypeLanguage from '@goodmind/telegram-tl-node';
// import { clone } from 'ramda';

import { addPublicKeys } from './publickeys';
import { config, SERVER } from './config';

const schema = require('./api-tlschema-57.json');

const telegram = new Telegram(MTProto, TypeLanguage);
telegram.useSchema(schema);
addPublicKeys(telegram);

interface IServer {
  host: string;
  port: string;
}

const apiConnect = async (server: IServer = SERVER) => {
  const connection = new MTProto.net.HttpConnection(server);
  const setupClient = telegram.createClient();
  setupClient.setConnection(connection);
  await new Promise(rs => connection.connect(rs));
  const client = await setupClient.setup(config);

  console.log(`Connected to Telegram on ${server.host}`);
  console.log(`Client config:\n`, client.schema, client);

  return client;
};

export default apiConnect;