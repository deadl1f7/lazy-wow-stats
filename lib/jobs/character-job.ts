import { default as Job } from './job';
import { Character } from  '../tasks/character-task';
import environment from '../variables/environment';

export default class CharacterJob extends Job<Character>{
  executionIntervalSeconds: number = 43200;
  jobName: string = 'Character job';
  shouldFlush = false;

  // overrides base job behaviour for throttling requests
  // async execute() {
  //   const now = new Date();
  //   if (this.executionDate < now) {
  //     try {
  //       // tslint:disable-next-line:max-line-length
  //       const numberOfRequests = this.tasks.length < this.maxRequests ?
  //       this.tasks.length : this.maxRequests;
  //       let offset = 0;
  //       let results:Character[] = [];
  //       while (offset < this.tasks.length) {
  //         // tslint:disable-next-line:max-line-length
  //         const throttledTasks = this.tasks.slice(offset, numberOfRequests + offset);
  //         offset += throttledTasks.length;

  //         results = results.concat(await Promise.all(throttledTasks.map(task => task.perform()))
  //         // tslint:disable-next-line:max-line-length
  //         .then((characters:Character[]) => new Promise<Character[]>((rslv) =>
  //       { setTimeout(rslv.bind(null, characters), environment.apiPollTimeout); })));

  //       }
  //       await this.handler.handle(results);
  //       console.log(`executed: ${this.jobName},id:${this.id}
  //        at: ${new Date().toLocaleString()}`);
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }finally {
  //       // tslint:disable-next-line:max-line-length
  //       this.executionDate.setTime(now.getTime() + (this.executionIntervalSeconds * 1000));
  //       console.log(`next ${this.jobName} execution at ${this.executionDate}`);

  //     }
  //   }

  // }
}
