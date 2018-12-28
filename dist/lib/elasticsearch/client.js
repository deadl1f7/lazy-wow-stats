"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("elasticsearch");
const environment_1 = __importDefault(require("../variables/environment"));
const hosts = environment_1.default.elasticSearchHosts;
const elasticsearchClient = new elasticsearch_1.Client({
    hosts,
});
exports.default = elasticsearchClient;
//# sourceMappingURL=client.js.map