/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	watch:{
  		css:{
        options:{livereload:true},
  			files:['public/app/content/css/**/*.css', 'public/build/css/bootstrap.css'],
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
      },
      less:{
        files:['public/app/content/less/*.less'],
        tasks:['less:site']
      }
  	},
    concat:{
      framework:{
        src:[
          'public/vendor/bower/jquery/jquery/dist/jquery.js',
          'public/vendor/bower/lodash/dist/lodash.js',
          'public/vendor/bower/angular/angular.js',
          'public/vendor/bower/angular-resource/angular-resource.js',
          'public/vendor/bower/angular-route/angular-route.js',
          'public/vendor/bower/angular-bootstrap/ui-bootstrap.js',
          'public/vendor/bower/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        dest:'public/build/framework.js'
      },
      app:{
        src:['public/app/js/**/*.js'],
        dest:'public/build/app.js'
      }
    },

    less:{
      site:{
        files:{
          'public/build/css/site.css':'public/app/content/less/site.less'
        }
      }
    },

    copy:{
      fonts:{
        files:[
          {expand:true, cwd:'public/vendor/bower/bootstrap-bower/fonts/', dest:'public/build/fonts/', src: '*'},
          {expand:true, cwd:'public/vendor/bower/font-awesome/fonts/', dest:'public/build/fonts/', src: '*'}
        ]
      }
    },

    cssmin:{
      combine:{
        files:{
          'public/build/css/site.css':[
            'public/vendor/bower/bootstrap-bower/css/bootstrap.css',
            'public/vendor/bower/bootstrap-bower/css/bootstrap-theme.css',
            'public/build/css/*.css'
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
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['ngtemplates','concat', 'less:site','cssmin', 'copy:fonts']);
  grunt.registerTask('heroku', ['ngtemplates','concat', 'cssmin']);
};
