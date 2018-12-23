const args = process.argv;

const argumentKvp:{[key:string]:string} = {};
console.log(`args:${args.length}`);
args.slice(2).forEach((arg) => {
  console.log(`arg:${arg}`);
  if (arg.includes('--')) {
    const argument = arg.substring(2);
    const [key, val] = argument.split('=');
    argumentKvp[key] = val;
  }
});

const getVariable = (key:string):string | undefined => {
  return process.env[key] || argumentKvp[key];
};

const getVariableWithDef = (key:string, def:string):string => {
  return process.env[key] || argumentKvp[key] || def;
};

const locale = getVariableWithDef('locale', 'en_US');
const fields = getVariableWithDef('info', 'stats,items,progression');
const region = getVariable('region');
const guilds = getVariable('guilds');
const players = getVariable('players');
const blizzApiUrl = `https://${region}.api.blizzard.com`;
const blizzAuthUrl = `https://${region}.battle.net`;
const clientId = getVariable('clientid');
const clientSecret = getVariable('clientsecret');
const eshosts = getVariableWithDef('eshosts', 'localhost:9200');

const guildRealmMappings = guilds ? guilds.split(',').map((t) => {
  const [guild, realm] = t.split(':');
  return { guild, realm };
}) : [];

const playerRealmMappings = players ? players.split(',').map((t) => {
  const [player, realm] = t.split(':');
  return { player, realm };
}) : [];

const elasticSearchHosts = eshosts ? eshosts.split(',') : [];

if ((!guilds && ! players) ||
  !region ||
  !clientId ||
  !clientSecret ||
  !eshosts) {
  // tslint:disable-next-line:max-line-length
  const missings = `Missing parameters:
  ${!region ? 'region' : ''}
  ${!guilds ? 'guilds,' : ''}
  ${!players ? 'players,' : ''}
  ${!eshosts ? 'eshosts' : ''}
  ${!clientId ? 'clientid' : ''}
  ${!clientSecret ? 'clientsecret' : ''}
  `;
  throw Error(missings);
}

export default {
  locale,
  fields,
  blizzApiUrl,
  blizzAuthUrl,
  clientId,
  clientSecret,
  elasticSearchHosts,
  guilds : guildRealmMappings,
  players : playerRealmMappings,
};
