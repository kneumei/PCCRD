/* Exports an object that defines
 *  all of the paths & globs that the project
 *  is concerned with.
 *
 * The "configure" task will require this file and
 *  then re-initialize the grunt config such that
 *  directives like <config:files.js.app> will work
 *  regardless of the point you're at in the build
 *  lifecycle.
 *
 * You can find the parent object in: node_modules/lineman/config/files.coffee
 */

module.exports = require(process.env['LINEMAN_MAIN']).config.extend('files', {
  js: {
    vendor: [
      "vendor/bower/angular/angular.js",
      "vendor/bower/angular-route/angular-route.js",
      "vendor/bower/angular-resource/angular-resource.js",
      "vendor/bower/lodash/lodash.js",
      "vendor/bower/jquery/jquery.js",
      "vendor/bower/bootstrap/dist/js/bootstrap.js",
      "vendor/bower/bootstrap/js/collapse.js",
      "vendor/js/**/*.js"
    ],
    app: [
      "app/js/app.js",
      "app/js/**/*.js"
    ]
  },

  css: {
    vendor:[
    "vendor/bower/bootstrap/dist/css/bootstrap.css",
    "vendor/bower/bootstrap/dist/css/bootstrap-theme.css"
    ]
  }
});
