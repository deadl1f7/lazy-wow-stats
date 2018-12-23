import { default as Job } from '../jobs/job';

export default interface JobRunner{

  jobs:Job<any>[];
  poller:any;

  addJob<T>(job: Job<T>):void;

  flushJobs():void;

  flushJobsWithTag(tag:string):void;

}
