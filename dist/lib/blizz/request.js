"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __importStar(require("request"));
const auth_1 = __importDefault(require("../blizz/auth"));
const environment_1 = __importDefault(require("../variables/environment"));
let runningRequests = 0;
const maxRequests = 100;
const maxRate = 1000;
const getRequest = (action, parameters) => {
    runningRequests += 1;
    const promise = new Promise((resolve, reject) => {
        auth_1.default.getToken()
            // tslint:disable-next-line:max-line-length
            .then(token => new Promise((rslv) => { setTimeout(rslv.bind(null, token), 1000 * (runningRequests / maxRequests)); }))
            .then((token) => {
            runningRequests -= 1;
            // tslint:disable-next-line:max-line-length
            const url = `${environment_1.default.blizzApiUrl}${action}?${Object.keys(parameters).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`).join('&')}`;
            const req = request.get(url, {
                headers: {
                    Authorization: `Bearer ${token.token['access_token']}`,
                },
            }, (err, response) => {
                if (response.statusCode !== 200) {
                    console.log(response.statusMessage);
                    reject();
                }
                const data = JSON.parse(response.body);
                resolve(data);
            });
        })
            .catch((err) => {
            runningRequests -= 1;
            console.log(err);
        });
    });
    return promise;
};
exports.getRequest = getRequest;
//# sourceMappingURL=request.js.map