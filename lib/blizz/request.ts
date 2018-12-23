import  * as request from 'request';
import auth from '../blizz/auth';
import { AccessToken } from 'simple-oauth2';
import environment from '../variables/environment';

let runningRequests = 0;
const maxRequests = 100;
const maxRate = 1000;

const getRequest = <T>(action:string,
                       parameters:{[key:string]:string}) => {
  runningRequests += 1;
  const promise = new Promise<T>((resolve, reject)  => {
    auth.getToken()
    // tslint:disable-next-line:max-line-length
    .then(token => new Promise<AccessToken>((rslv) => { setTimeout(rslv.bind(null, token), 1000 * (runningRequests / maxRequests)); }))
    .then((token:AccessToken) => {
      runningRequests -= 1;
      // tslint:disable-next-line:max-line-length
      const url = `${environment.blizzApiUrl}${action}?${Object.keys(parameters).map((key:string) => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`).join('&')}`;
      const req = request.get(url, {
        headers:{
          Authorization: `Bearer ${token.token['access_token']}`,
        },
      },                      (err, response) => {
        if (response.statusCode !== 200) {
          console.log(response.statusMessage);
          reject();
        }
        const data = <T>JSON.parse(response.body);
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
export {
    getRequest,
};
