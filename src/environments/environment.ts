// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC8YkS1MlpFKRX7UEg-lbnozxBo_la3YCk',
    authDomain: 'my-pet-care-production.firebaseapp.com',
    databaseURL: 'https://my-pet-care-production.firebaseio.com',
    projectId: 'my-pet-care-production',
    storageBucket: 'my-pet-care-production.appspot.com',
    messagingSenderId: '719320451385'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
