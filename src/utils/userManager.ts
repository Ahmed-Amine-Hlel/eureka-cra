import { UserManager } from 'oidc-client';

const userManagerConfig = {
  authority:
    'https://itgp.apigee.dev.echonet/auth/oauth2/v2/.well-known/openid-configuration',
  client_id: 'qStb3Z8O7GXIzB1tGmIvhFSe3LaYbBJv',
  redirect_uri: 'http://localhost:3000/callback.com',
  response_type: 'code',
  client_secret: 'IBJwCyuRBD5xeymx',
  scope: 'openid',
};

const userManager = new UserManager(userManagerConfig);

export default userManager;
