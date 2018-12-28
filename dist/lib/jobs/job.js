"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
class Job {
    constructor(options) {
        this.executionDate = new Date();
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
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            if (this.executionDate < now) {
                try {
                    const results = yield Promise.all(this.tasks.map(task => task.perform()));
                    yield this.handler.handle(results);
                    console.log(`executed: ${this.jobName},id:${this.id} at: ${new Date().toLocaleString()}`);
                    return true;
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
                finally {
                    // tslint:disable-next-line:max-line-length
                    this.executionDate.setTime(now.getTime() + (this.executionIntervalSeconds * 1000));
                    console.log(`next ${this.jobName} execution at ${this.executionDate}`);
                }
            }
        });
    }
}
exports.default = Job;
//# sourceMappingURL=job.js.map