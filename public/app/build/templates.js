angular.module('pccrd').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('public/app/js/views/home.html',
    "Hello"
  );


  $templateCache.put('public/app/js/views/organizations.html',
    "<div>\n" +
    "\tOrganizations \n" +
    "</div>"
  );

}]);
