"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../blizz/request");
const environment_1 = __importDefault(require("../variables/environment"));
const action = '/wow/character';
class CharacterTask {
    constructor(characterName, realm, guild) {
        this.characterName = characterName;
        this.realm = realm;
        this.guild = guild;
    }
    perform() {
        // tslint:disable-next-line:max-line-length
        return request_1.getRequest(`${action}/${this.realm}/${this.characterName}`, { fields: environment_1.default.fields, locale: environment_1.default.locale }).then((character) => {
            const lastModified = new Date(character.lastModified);
            if (this.guild) {
                character['guildName'] = this.guild.name;
            }
            character.lastModified = lastModified;
            return character;
        });
    }
}
exports.default = CharacterTask;
//# sourceMappingURL=character-task.js.map