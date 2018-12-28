"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../blizz/request");
const environment_1 = __importDefault(require("../variables/environment"));
const fields = 'members';
class GuildTask {
    constructor(guildName, realm) {
        this.action = `/wow/guild/${realm}/${guildName}`;
    }
    perform() {
        return request_1.getRequest(this.action, { fields, locale: environment_1.default.locale });
    }
}
exports.default = GuildTask;
//# sourceMappingURL=guild-task.js.map