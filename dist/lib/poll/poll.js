"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_polling_1 = __importDefault(require("async-polling"));
const pollRate = 5000;
class JobPolling {
    constructor() {
        this.jobs = [];
    }
    addJob(job) {
        this.jobs.push(job);
    }
    flushJobs() {
        this.jobs = this.jobs.filter(job => !job.shouldFlush);
    }
    flushJobsWithTag(tag) {
        this.jobs = this.jobs.filter(job => job.tag !== tag);
    }
    stopPoll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.poller.stop();
        });
    }
    startPoll() {
        console.log('starting poll');
        const promise = new Promise((resolve) => {
            this.poller = async_polling_1.default((end) => __awaiter(this, void 0, void 0, function* () {
                if (this.jobs.length === 0) {
                    this.poller.stop();
                    resolve();
                    return;
                }
                const jobsForExecution = this.jobs.map(job => job.execute());
                yield Promise.all(jobsForExecution);
                end();
            }), pollRate);
            this.poller.run();
        });
        return promise;
    }
}
exports.default = new JobPolling();
//# sourceMappingURL=poll.js.map