const locale = process.env['locale'] || 'en_US';
const fields = process.env['info'] || 'stats,items,progression';
// const guildName = process.env['guild'];
// const realm = process.env['realm'];
const targets = (process.env['guilds'] || '').split(',');
const guildRealmMappings = targets.map((t) => {
  const [guild, realm] = t.split(':');
  return { guild, realm };
});

const players = process.env['players'];
const playerRealmMappings = players ? players.split(',').map((t) => {
  const [player, realm] = t.split(':');
  return { player, realm };
}) : [];

const region = process.env['region'];

if (!guildRealmMappings.length || !region) {
  // tslint:disable-next-line:max-line-length
  const missings = `Missing parameters:${!guildRealmMappings ? 'targets,' : ''}${!region ? 'region' : ''}`;
  throw Error(missings);
}

const blizzApiUrl = `https://${region}.api.blizzard.com`;
const blizzAuthUrl = `https://${region}.battle.net`;
const clientId = process.env['clientId'] ;
const clientSecret = process.env['clientSecret'];
const elasticSearchHosts = (process.env['esHosts'] || '').split(',');

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
