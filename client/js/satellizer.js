app.config(function($authProvider) {

  $authProvider.loginUrl = 'http://localhost:3000/auth/login';

  $authProvider.signupUrl = 'http://localhost:3000/auth/signup';

  $authProvider.oauth2({
    name: 'instagram',
    url: 'http://localhost:3000/auth/instagram',
    redirectUri: 'http://localhost:3000/auth/instagram/callback',
    clientId: config.clientID,
    requiredUrlParams: ['scope'],
    scope: ['likes'],
    scopeDelimiter: '+',
    authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
  });

});
