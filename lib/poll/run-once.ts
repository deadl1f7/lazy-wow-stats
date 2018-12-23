import asyncPolling from 'async-polling';
import uuid from 'uuid';
import { default as JobRunner } from '../contracts/job-runner';
import { default as Job } from '../jobs/job';

const pollRate = 50;

class RunOnce implements JobRunner {
  flushJobsWithTag(tag: string): void {
    this.jobs = this.jobs.filter(job => job.tag !== tag);
  }
  id: string;
  jobs: Job<any>[];
  poller: any;

  constructor() {
    this.id = uuid.v4();
    this.jobs = [];

  }

  addJob<T>(job: Job<T>): void {
    job.id = this.id;
    this.jobs.push(job);
  }
  flushJobs(): void {

  }
  stopPoll(): void {

  }

  startPoll() {

    console.log('starting poll');
    this.poller = asyncPolling(async (end) => {
      if (this.jobs.length === 0) {
        this.poller.stop();
      }
      const job = this.jobs.shift();

      if (job) {
        await job.execute();
        if (!job.shouldFlush) {
          this.jobs.push(job);
        }

      }
      end();

    },                         pollRate);
    this.poller.run();
  }

}

export default new RunOnce();
