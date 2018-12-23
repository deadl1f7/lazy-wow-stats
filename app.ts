import { default as JobPolling } from './lib/poll/poll';
import { default as GuildJob } from './lib/jobs/guild-job';
import { default as GuildTask, Guild } from './lib/tasks/guild-task';
import { default as GuildHandler } from './lib/handlers/guild-handler';
import { default as CharacterJob } from './lib/jobs/character-job';
import { default as CharacterTask } from './lib/tasks/character-task';
import { default as CharacterHandler } from './lib/handlers/character-handler';
import environment from './lib/variables/environment';

environment.guilds.forEach(t => JobPolling.addJob(new GuildJob({
  tasks: [new GuildTask(t.guild, t.realm)],
  handler: new GuildHandler(),
})));

if (environment.players.length) {
  JobPolling.addJob(new CharacterJob({
    tasks: environment.players.map(p => new CharacterTask(p.player, p.realm)),
    handler: new CharacterHandler(),
  }));
}

JobPolling.startPoll();
