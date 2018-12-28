"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_1 = __importDefault(require("./job"));
class GuildJob extends job_1.default {
    constructor() {
        super(...arguments);
        this.executionIntervalSeconds = 86400;
        this.jobName = 'Guild job';
        this.shouldFlush = false;
    }
}
exports.default = GuildJob;
//# sourceMappingURL=guild-job.js.map