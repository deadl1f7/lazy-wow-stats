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
// tslint:disable-next-line:max-line-length
const simple_oauth2_1 = require("simple-oauth2");
const environment_1 = __importDefault(require("../variables/environment"));
const creds = {
    client: {
        idParamName: 'user',
        secretParamName: 'password',
        id: environment_1.default.clientId,
        secret: environment_1.default.clientSecret,
    },
    options: {
        bodyFormat: 'form',
        authorizationMethod: 'header',
    },
    auth: {
        tokenHost: environment_1.default.blizzAuthUrl,
        authorizeHost: environment_1.default.blizzAuthUrl,
    },
};
const auth = simple_oauth2_1.create(creds);
const config = {};
let accessToken;
const getToken = () => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!accessToken) {
            const result = yield auth.clientCredentials.getToken(config);
            accessToken = auth.accessToken.create(result);
        }
        if (accessToken.expired()) {
            accessToken = yield accessToken.refresh();
        }
        return accessToken;
    }
    catch (error) {
        console.log('Access Token Error', error.message);
    }
    throw new Error('couldnt get accesstoken');
});
exports.default = {
    getToken,
};
//# sourceMappingURL=auth.js.map