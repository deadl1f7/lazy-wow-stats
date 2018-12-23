import { default as Job } from './job';
import { default as GuildTask, Guild } from '../tasks/guild-task';
import { default as JobPolling } from '../poll/poll';
import { default as GuildHandler } from '../handlers/guild-handler';

export default class GuildJob extends Job<Guild>{
  executionIntervalSeconds: number = 86400;
  jobName: string = 'Guild job';
  shouldFlush = false;

}
