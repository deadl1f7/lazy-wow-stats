import asyncPolling from 'async-polling';
import { default as Job } from '../jobs/job';
import uuid from 'uuid';
import { default as JobRunner } from '../contracts/job-runner';
import { promises } from 'fs';
import environment from '../variables/environment';

const pollRate = 5000;

class JobPolling implements JobRunner{
  jobs:Job<any>[];
  poller:any;
  constructor() {
    this.jobs = [];
  }

  addJob<T>(job: Job<T>) {
    this.jobs.push(job);
  }

  flushJobs() {
    this.jobs = this.jobs.filter(job => !job.shouldFlush);
  }

  flushJobsWithTag(tag:string) {
    this.jobs = this.jobs.filter(job => job.tag !== tag);
  }

  async stopPoll() {
    this.poller.stop();
  }

  startPoll() {
    console.log('starting poll');
    const promise = new Promise<void>((resolve) => {
      this.poller = asyncPolling(async (end) => {

        if (this.jobs.length === 0) {
          this.poller.stop();
          resolve();
          return;
        }

        const jobsForExecution = this.jobs.map(job => job.execute());

        await Promise.all(jobsForExecution);

        end();
      },                         pollRate);
      this.poller.run();
    });
    return promise;
  }

}

export default new JobPolling();
