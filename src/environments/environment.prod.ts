import { env } from './.env';

export const environment = {
  production: true,
  version: env['npm_package_version'],
  serverUrl: 'https://api.chucknorris.io',
  defaultLanguage: 'english',
  supportedLanguages: ['english', 'español'],
  firebaseConfig: {
    apiKey: 'AIzaSyBS0_XhAKqIJxGeIUlyka3s0YSfVgZ38bQ',
    authDomain: 'examenfrontend-1bb5f.firebaseapp.com',
    projectId: 'examenfrontend-1bb5f',
    storageBucket: 'examenfrontend-1bb5f.appspot.com',
    messagingSenderId: '503568728769',
    appId: '1:503568728769:web:37b5867e39af2923be8a40',
  },
};
