import { default as Handler } from '../contracts/handler';
import { default as Task } from '../contracts/task';
import uuid = require('uuid');

export interface JobCreateOptions<T>{
  tasks:Task<T>[];
  handler:Handler<T>;
  executionDate?:Date;
  tag?:string;
}

export default abstract class Job<T>{

  id:string;
  tag:string;
  tasks:Task<T>[];
  handler:Handler<T>;
  shouldFlush:boolean;
  executionDate:Date = new Date();
  abstract jobName:string;
  abstract executionIntervalSeconds:number;
  constructor(options:JobCreateOptions<T>) {
    this.id = uuid.v4();
    this.tag = options.tag || '';
    this.tasks = options.tasks;
    this.handler = options.handler;
    this.executionDate = new Date();
    this.shouldFlush = false;
    if (options.executionDate) {
      this.executionDate = this.executionDate;
    }
  }
  async execute() {
    const now = new Date();
    if (this.executionDate < now) {
      try {
        const results = await Promise.all(this.tasks.map(task => task.perform()));
        await this.handler.handle(results);
        console.log(`executed: ${this.jobName},id:${this.id} at: ${new Date().toLocaleString()}`);
        return true;
      }catch (error) {
        console.log(error);
        return false;
      }finally {
        // tslint:disable-next-line:max-line-length
        this.executionDate.setTime(now.getTime() + (this.executionIntervalSeconds * 1000));
        console.log(`next ${this.jobName} execution at ${this.executionDate}`);

      }
    }

  }
}
