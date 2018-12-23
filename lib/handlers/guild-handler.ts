import { default as Handler } from  '../contracts/handler';
import { default as GuildTask, Guild } from '../tasks/guild-task';
import { default as JobPolling } from '../poll/poll';
import { default as CharacterJob } from '../jobs/character-job';
import { default as CharacterTask } from '../tasks/character-task';
import { default as CharacterHandler } from '../handlers/character-handler';
import { default as GuildJob } from '../jobs/guild-job';
import { JobCreateOptions } from '../jobs/job';

const guildJobExecutionIntervalHours = 24;

export default class GuildHandler implements Handler<Guild>{
  handle(param: Guild[]): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      param.forEach((guild) => {
        console.log(`Got guild: ${guild.name}`);
        const tag = `guild_${guild.name}`;
        JobPolling.flushJobsWithTag(tag);
        if (!('members' in guild)) {
          console.log(`No members field: ${guild.name}`);
        }
        const members = guild['members'] as any[];
        const names = members.map(m => m['character']['name']);

      // tslint:disable-next-line:max-line-length
        const characterTasks = names.map(name => new CharacterTask(name, guild.realm));
        const job = new CharacterJob({
          tag,
          tasks: characterTasks,
          handler : new CharacterHandler(),
        });
        JobPolling.addJob(job);
      });
      resolve();
    });
    return promise;
  }
}
