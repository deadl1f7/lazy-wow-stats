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
const client_1 = __importDefault(require("../elasticsearch/client"));
const index = 'character';
const type = 'stats';
const maxBulk = 50;
class CharacterHandler {
    handle(param) {
        // tslint:disable-next-line:max-line-length
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bulk = [];
                param.forEach((c) => {
                    bulk.push({ index: { _index: index, _type: type } });
                    c['timestamp'] = new Date();
                    bulk.push(c);
                });
                console.log(`Bulk inserting ${param.length} characters`);
                let slice = [];
                let sliceCount = 0;
                while ((slice = bulk.slice(0, maxBulk)).length > 0) {
                    sliceCount += slice.length;
                    console.log(`Inserted ${sliceCount}/${slice.length}`);
                    yield client_1.default.bulk({
                        body: slice,
                    });
                }
                resolve();
            }
            catch (error) {
                console.log(error);
                reject();
            }
        }));
    }
}
exports.default = CharacterHandler;
//# sourceMappingURL=character-handler.js.map