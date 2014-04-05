/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	watch:{
  		css:{
        options:{livereload:true},
  			files:['public/app/css/**/*.css'],
  			tasks:['cssmin']
  		},
  		js:{
        options:{livereload:true},
  			files:['public/app/js/**/*.js'],
  			tasks:['concat:app']
  		},
      templates:{
        files:['public/app/js/directives/**/*.html', 'public/app/js/views/**/*.html'],
        tasks: ['ngtemplates:directives']
      }
  	},
    concat:{
      framework:{
        src:[
          'public/vendor/bower/jquery/jquery/dist/jquery.js',
          'public/vendor/bower/angular/angular.js',
          'public/vendor/bower/angular-resource/angular-resource.js',
          'public/vendor/bower/angular-route/angular-route.js',
        ],
        dest:'public/build/framework.js'
      },
      app:{
        src:['public/app/js/**/*.js'],
        dest:'public/build/app.js'
      }
    },
    cssmin:{
      combine:{
        files:{
          'public/build/site.css':[
            'public/app/css/**/*.css'
          ],
          'public/build/bootstrap.css':[
            'public/vendor/bower/bootstrap/dist/css/bootstrap.css',
            'public/vendor/bower/bootstrap/dist/css/bootstrap-theme.css'
          ]
        }
      }
    },
    ngtemplates:{
      directives:{
        options:{
          base:'',
          module:'pccrd'
        },
        src:['public/app/js/**/**.html'],
        dest: 'public/build/templates.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['ngtemplates','concat', 'cssmin']);
  grunt.registerTask('heroku', ['ngtemplates','concat', 'cssmin']);
};
