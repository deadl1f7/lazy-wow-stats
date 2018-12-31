"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const poll_1 = __importDefault(require("../poll/poll"));
const character_job_1 = __importDefault(require("../jobs/character-job"));
const character_task_1 = __importDefault(require("../tasks/character-task"));
const character_handler_1 = __importDefault(require("../handlers/character-handler"));
const guildJobExecutionIntervalHours = 24;
class GuildHandler {
    handle(param) {
        const promise = new Promise((resolve, reject) => {
            param.forEach((guild) => {
                console.log(`Got guild: ${guild.name}`);
                const tag = `guild_${guild.name}`;
                poll_1.default.flushJobsWithTag(tag);
                if (!('members' in guild)) {
                    console.log(`No members field: ${guild.name}`);
                }
                const members = guild['members'];
                const names = members.map(m => m['character']['name']);
                // tslint:disable-next-line:max-line-length
                const characterTasks = names.map(name => new character_task_1.default(name, guild.realm, guild));
                const job = new character_job_1.default({
                    tag,
                    tasks: characterTasks,
                    handler: new character_handler_1.default(),
                });
                poll_1.default.addJob(job);
            });
            resolve();
        });
        return promise;
    }
}
exports.default = GuildHandler;
//# sourceMappingURL=guild-handler.js.map