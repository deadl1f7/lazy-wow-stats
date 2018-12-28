"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_1 = __importDefault(require("./job"));
class CharacterJob extends job_1.default {
    constructor() {
        super(...arguments);
        this.executionIntervalSeconds = 43200;
        this.jobName = 'Character job';
        this.shouldFlush = false;
    }
}
exports.default = CharacterJob;
//# sourceMappingURL=character-job.js.map