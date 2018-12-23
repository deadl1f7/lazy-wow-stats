// tslint:disable-next-line:max-line-length
import { ModuleOptions, create, Token, ClientCredentialTokenConfig, AccessToken } from 'simple-oauth2';
import request from 'request';
import environment from '../variables/environment';

const creds = <ModuleOptions<'user'>>{
  client: {
    idParamName:'user',
    secretParamName:'password',
    id: environment.clientId,
    secret: environment.clientSecret,
  },
  options:{
    bodyFormat:'form',
    authorizationMethod:'header',
  },

  auth: {
    tokenHost: environment.blizzAuthUrl,
    authorizeHost: environment.blizzAuthUrl,
  },
};

const auth = create(creds);

const config:ClientCredentialTokenConfig = {

};

let accessToken: AccessToken;

const getToken = async (): Promise<AccessToken> => {
  try {
    if (!accessToken) {
      const result = await auth.clientCredentials.getToken(config);
      accessToken = auth.accessToken.create(result);
    }
    if (accessToken.expired()) {
      accessToken = await accessToken.refresh();
    }
    return accessToken;

  } catch (error) {
    console.log('Access Token Error', error.message);
  }
  throw new Error('couldnt get accesstoken');
};

export default {
  getToken,
};
