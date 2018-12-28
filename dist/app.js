"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const poll_1 = __importDefault(require("./lib/poll/poll"));
const guild_job_1 = __importDefault(require("./lib/jobs/guild-job"));
const guild_task_1 = __importDefault(require("./lib/tasks/guild-task"));
const guild_handler_1 = __importDefault(require("./lib/handlers/guild-handler"));
const character_job_1 = __importDefault(require("./lib/jobs/character-job"));
const character_task_1 = __importDefault(require("./lib/tasks/character-task"));
const character_handler_1 = __importDefault(require("./lib/handlers/character-handler"));
const environment_1 = __importDefault(require("./lib/variables/environment"));
environment_1.default.guilds.forEach(t => poll_1.default.addJob(new guild_job_1.default({
    tasks: [new guild_task_1.default(t.guild, t.realm)],
    handler: new guild_handler_1.default(),
})));
if (environment_1.default.players.length) {
    poll_1.default.addJob(new character_job_1.default({
        tasks: environment_1.default.players.map(p => new character_task_1.default(p.player, p.realm)),
        handler: new character_handler_1.default(),
    }));
}
poll_1.default.startPoll();
//# sourceMappingURL=app.js.map