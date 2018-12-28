import { default as Job } from './job';
import { Character } from  '../tasks/character-task';
import environment from '../variables/environment';

export default class CharacterJob extends Job<Character>{
  executionIntervalSeconds: number = 43200;
  jobName: string = 'Character job';
  shouldFlush = false;

}
