////////////////////////////////////////////////////////////////
// This two will be imported in polyfills in webpack.config.js//
// import 'core-js';                                          //
// import 'zone.js/dist/zone';                                //
////////////////////////////////////////////////////////////////
import 'bootstrap/dist/css/bootstrap.css';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.info('8 -- app.environment is: ', app.environment);
if ( app.environment === 'production' ) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
