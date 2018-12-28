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
const uuid_1 = __importDefault(require("uuid"));
const pollRate = 50;
class RunOnce {
    flushJobsWithTag(tag) {
        this.jobs = this.jobs.filter(job => job.tag !== tag);
    }
    constructor() {
        this.id = uuid_1.default.v4();
        this.jobs = [];
    }
    addJob(job) {
        job.id = this.id;
        this.jobs.push(job);
    }
    flushJobs() {
    }
    stopPoll() {
    }
    startPoll() {
        console.log('starting poll');
        this.poller = async_polling_1.default((end) => __awaiter(this, void 0, void 0, function* () {
            if (this.jobs.length === 0) {
                this.poller.stop();
            }
            const job = this.jobs.shift();
            if (job) {
                yield job.execute();
                if (!job.shouldFlush) {
                    this.jobs.push(job);
                }
            }
            end();
        }), pollRate);
        this.poller.run();
    }
}
exports.default = new RunOnce();
//# sourceMappingURL=run-once.js.map