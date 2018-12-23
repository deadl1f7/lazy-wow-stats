import { default as Task } from '../contracts/task';
import { getRequest } from '../blizz/request';
import environment from '../variables/environment';
const fields = 'members';

export interface Guild{

  lastModified: Date;
  name: string;
  realm: string;
  battlegroup:string;
  level: number;
  side: number;
  achievementPoints: number;
  emblem:any;
  [key:string]:any;

}

export default class GuildTask implements Task<Guild>{

  action:string;
  constructor(guildName:string, realm:string) {
    this.action = `/wow/guild/${realm}/${guildName}`;
  }

  perform(): Promise<Guild> {
    return getRequest(this.action, { fields, locale: environment.locale });
  }
}
